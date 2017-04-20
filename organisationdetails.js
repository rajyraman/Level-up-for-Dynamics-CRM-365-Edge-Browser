chrome.runtime.sendMessage({type: 'page', category: 'load'}, function(response) {
    let rows = response
    .filter(x=>x.value)
    .map(x=> {
      let key = x.name.toLowerCase();
      if(_.isBoolean(x.value)) {
       x.value = x.value ? 'Yes' : 'No'; 
      }
      else if(_.isObject(x.value)) {
       x.value = x.value.Value; 
      }
      if(key === 'fiscalcalendarstart' || key === 'createdon' || key === 'modifiedon'){
          x.value = moment(x.value).format('DD-MMM-YYYY');
      }
	  return `<tr><td class='name'>${key}</td><td class='value'>${_.escape(x.value)}</td></tr>` 
    })
    .sort()
    .join('');
    
    document.getElementById('results').innerHTML =  rows;

    new List('grid', { 
        valueNames: [ 'name', 'value' ]
    });    
});
