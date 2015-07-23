var api_key = 'DC4510C137D9464C8B6531F7D0EFF0F8';
var api_url = 'http://localhost:5000/api/';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json();
}

var printer_status = {}

var update_printer_status = function() {
  return fetch(api_url+'printer', {headers: {'X-Api-Key': api_key}})
  .then(checkStatus)
  .then(parseJSON)
  .then(function(json) {
    printer_status = json;
    return printer_status;
  })
  .catch(function(error) {
    if(error.response.status=="409") {
      return fetch(api_url+'connection', {headers: {'X-Api-Key': api_key}})
      .then(checkStatus)
      .then(parseJSON)
      .then(function(json) {
        printer_status = {
          sd: {ready: false},
          state: {
            text: json.current.state,
            flags: {
              operational: false,
              paused: false,
              printing: false,
              sdReady: false,
              error: false,
              ready: false,
              closedOrError: true
            }
          },
          temperature: {}
        };
        return printer_status;
      });
      //{flags: {operational: false}};
    } else {
      throw error;
    }
  });
}

var connect_to_port = function(port) {
  return fetch(
    api_url+'connection',
    {
      method: "post",
      headers: {
        'X-Api-Key': api_key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "command": "connect",
        "port": port
      })
    }
  )
  .then(checkStatus);
}

var disconnect = function() {
  return fetch(
    api_url+'connection',
    {
      method: "post",
      headers: {
        'X-Api-Key': api_key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "command": "disconnect"
      })
    }
  )
  .then(checkStatus);
}

var get_ports_list = function() {
  return fetch(api_url+'connection', {headers: {'X-Api-Key': api_key}})
  .then(checkStatus)
  .then(parseJSON)
  .then(function(json) {
    return json.options.ports;
  });
}

var get_files_list = function() {
  return fetch(api_url+'files', {headers: {'X-Api-Key': api_key}})
  .then(checkStatus)
  .then(parseJSON)
  .then(function(json) {
    return json.files;
  });
}

var print_file = function(file) {
  return fetch(
    api_url+'files'+'/'+file,
    {
      method: "post",
      headers: {
        'X-Api-Key': api_key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "command": "select",
        "print": true
      })
    }
  )
  .then(checkStatus);
}


var job_status = {};

var update_job_status = function() {
  return fetch(api_url+'job', {headers: {'X-Api-Key': api_key}})
  .then(checkStatus)
  .then(parseJSON)
  .then(function(json) {
    job_status = json;
    return job_status;
  });
}

var job_command = function(command) {
  return fetch(
    api_url+'job',
    {
      method: "post",
      headers: {
        'X-Api-Key': api_key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "command": command
      })
    }
  )
  .then(checkStatus);
}
