import React from 'react';
import MyRoutinesNav from './my-routines-nav.react.js';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Launch from 'material-ui/svg-icons/action/launch';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Link, browserHistory} from 'react-router';
import Draggable from 'react-draggable';
import data from '../../utils/api-utils';
import ReactDOM from 'react-dom';
export default class MyRoutines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routines: [],
      tasks: [],
      strikeStyle: {textDecoration: 'none'},
      routinePositions:{},
    };
    this.getRoutineData = this.getRoutineData.bind(this);
    this.insertRoutine = this.insertRoutine.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.arrayObjectIndexOf = this.arrayObjectIndexOf.bind(this);
    this.storeCoordinates = this.storeCoordinates.bind(this);
    this.insertMovedRoutine = this.insertMovedRoutine.bind(this);

  }

  componentDidMount() {
    window.addEventListener("resize", this.storeCoordinates.bind(this));
    this.getRoutineData();
    // check for updates every 2 seconds, in case of emailed routine.
    // Using setstate makes this invisible to user (hopefully), but maybe taxing on db at scale.
    var update = setInterval(()=>{
                                  this.getRoutineData;
                                  this.setState({update: update});}, 2000);

  }

  componentDidUpdate(){
    this.storeCoordinates();
    console.log('routines:',this.state.routines)
  }

  getRoutineData() {
    data.getRoutines((err, data) => {
      // if (err) console.log(err);
      this.setState({
        routines: data
      });
    });
  }

  arrayObjectIndexOf(array, searchTerm) {
    for(var i = 0; i < array.length; i++) {
        if (array[i]['_id'] === searchTerm) return i;
    }
    return -1;
  }

  storeCoordinates(){
    for(var key in this.refs){
      this.state.routinePositions[key] = this.getCoords(key);
    }
    console.log(this.state.routinePositions)
  }

  handleRemoveRoutine(id) {
    RoutineActions.remove(id);
  }

  getCoords (routineId) {
    return ReactDOM.findDOMNode(this.refs[routineId]).getBoundingClientRect();
  }

  handleDrop(routineId, position) {


    var arr = JSON.parse(JSON.stringify(this.state.routines));
    var routinePositions = this.state.routinePositions;
    var draggedLeft = this.getCoords(routineId).left;
    var draggedTop = this.getCoords(routineId).top;

    var inserted = this.insertRoutine(routineId,draggedTop,draggedLeft,routinePositions,arr,-180,'left',0);
    if(inserted ==='inserted'){
      return;
    }
    var draggedRight = this.getCoords(routineId).right;

    var inserted = this.insertRoutine(routineId,draggedTop,draggedRight,routinePositions,arr,180,'right',1);
    if(inserted === 'inserted'){
      return;
    }

    this.setState({
        routines:[]
    });
    this.setState({
      routines:arr
    });
  }

  insertRoutine(routineId,draggedTop, draggedHorizonal, routinePositions,arr,offset,orientation,shift){
    var refs = Object.keys(this.refs);
    console.log('this is refs',refs)
    for(var a = 0; a < refs.length; a++) {
      if(refs[a]!==routineId) {
        var mid = (routinePositions[refs[a]][orientation]+offset);
        var top = (routinePositions[refs[a]].top);
        if(Math.abs(draggedHorizonal-mid)<180 && Math.abs(top-draggedTop)<150) {
          return this.insertMovedRoutine(arr,routineId,refs[a],shift);
        }
      }
    }
  }

  insertMovedRoutine(arr,routineId,refs,shift) {
    var movedObjectIndex = this.arrayObjectIndexOf(arr,routineId);
    var movedObject = arr.splice(movedObjectIndex,1)[0];
    var currentObjectIndex = this.arrayObjectIndexOf(arr, refs);
    arr.splice(currentObjectIndex+shift,0,movedObject);
    this.setState({
      routines: []
    })
    this.setState({
      routines:arr
    })
    // this.insertRoutineDB(routineId,refs);
    return 'inserted';
  }

  // insertRoutineDB(routineMoved,routineCurr){
  //   $.ajax({
  //     type:'PUT',
  //     url:'/reinsert',
  //     data:{
  //       routineMoved:routineMoved,
  //       routineCurr:routineCurr
  //     },
  //     success:function(){
  //       console.log('inserted');
  //     },
  //     error:function(){
  //       console.log('not inserted');
  //     }
  //   })
  // }


  render() {
    const paperStyle = {
      float: 'left',
      height: 400,
      width: 300,
      margin: 30,
      overflow: 'auto'
    };

    return (

      <div>


        <MyRoutinesNav colorChange={this.props.colorChange}/> {this.state.routines.map((routine) => {
          return (

              <div>
                <Draggable
                ref={routine._id}
                onStop= {()=>{setTimeout(()=>{this.handleDrop(routine._id)},1)}}
                >
              <Paper key={routine._id} style={paperStyle} zDepth={4}>
                {/* insert onTapTouch for FlatButton */}
                <AppBar title={routine.name}
                        titleStyle={{fontSize: 18}}
                        iconElementLeft={<IconButton onClick = {this.handleRemoveRoutine.bind(this, routine._id)}>
                                          <NavigationClose/>
                                         </IconButton>}
                        iconElementRight={< Link params = {{ id: routine._id }} to = {`/routines/${routine._id}`} >
                                            <IconButton><Launch/></IconButton>
                                          </Link>}
                        onRightIconButtonTouchTap={()=>{
                                                          browserHistory.push(
                                                              `/routines/${routine._id}`,
                                                            {id: routine._id}
                                                          )
                                                          }}/>
                <div className="day-quickview text-justify">
                  <span className={routine.repeat['Sunday']
                    ? 'day-view-on'
                    : 'day-view-off'}>SUN </span>
                  <span className={routine.repeat['Monday']
                    ? 'day-view-on'
                    : 'day-view-off'}>MON </span>
                  <span className={routine.repeat['Tuesday']
                    ? 'day-view-on'
                    : 'day-view-off'}>TUE </span>
                  <span className={routine.repeat['Wednesday']
                    ? 'day-view-on'
                    : 'day-view-off'}>WED </span>
                  <span className={routine.repeat['Thursday']
                    ? 'day-view-on'
                    : 'day-view-off'}>THUR </span>
                  <span className={routine.repeat['Friday']
                    ? 'day-view-on'
                    : 'day-view-off'}>FRI </span>
                  <span className={routine.repeat['Saturday']
                    ? 'day-view-on'
                    : 'day-view-off'}>SAT </span>
                </div>
                <List>

                  {/* for each task in routine */}
                  {routine.tasks.map((task, k) => {
                    return (
                      <div key={k}>
                        <Divider/> {/* insert onTapTouch for ListItem */}
                        <ListItem primaryText={task} rightIcon={< Link params = {{ name: routine.name }}to = {
                          `/tasks/${task.name}`
                        } > <Launch/> < /Link>}></ListItem>
                      </div>
                    );
                  })}
                </List>
              </Paper>
                </Draggable>
              </div>

          );
        })}
      </div>
    );
  }
}
