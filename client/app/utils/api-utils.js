module.exports.getRoutines = (cb) => {
  $.get('/routines', 'utf8', (data, err)=>{
    cb(err, data);
  })
};
