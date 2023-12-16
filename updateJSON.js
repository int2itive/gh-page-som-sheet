ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {

    const form = document.querySelector('.rap--sheet-entry-form');
    const btn = document.querySelector('#submit');
    const test = document.querySelector('.display--rap-sheet');
    const eventList = document.querySelector('.ul--event-list');
      var lookupName = "Sheba Montserrat";
      const mayRoster = ["Alim Kamara", "Yvonne Roberts", "Sheba Montserrat", "Akadi Sankofa", "Lady Esi", "Sola Story"];

      let ttlapps = 0;
      let fullNameList = [], years_every = [];
      let apps = [], incr = [];

      let threshold = 30,
          uBound = 7, 
          position = 0, 
          lastScroll = 0, 
          n_event = 0;

      const getRandom = function() {
        var max = 15;
        var min = 1;
        var numRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        //console.log(numRandom)
        return numRandom;
      };

      function in_array(array, el) {
        for(var i = 0 ; i < array.length; i++) 
          if(array[i] == el) return true;
        return false;
      }


      for (let i = 0; i < uBound; i++) {
        // Generate Random number between 1 - 15
        var num = getRandom(); //console.log("Counter "+i+" = : "+num);
        var flag = Array.isArray(incr) && !incr.length;
        // Add number to array if no elements exist
        if (flag) {
          console.log("Array is Empty");
          incr.push(num);
          continue;
        }

        let elemCount = incr.length;
        //console.log(elemCount);

        if(!in_array(incr, num)) {
           incr.push(num); 
           //return rand;
        } else {
          i--;
        }
      }

    function getInitialDate(dtarg) {
      let dlarge = swapArrayElements(dtarg.split("/"), 0, 1).join("/");
      return dlarge;
    }

    /**
    * Swap the elements in an array at indexes x and y.
    *
    * @param (a) The array.
    * @param (x) The index of the first element to swap.
    * @param (y) The index of the second element to swap.
    * @return {Array} The input array with the elements swapped.
    */
    function swapArrayElements(a, x, y) {
      if (a.length === 1) return a;
      a.splice(y, 1, a.splice(x, 1, a[y])[0]);
      return a;
    }


function generateEventList(eventFilter) {
  const unOrder = document.createElement('li');
  return `<li><p>${eventFilter.month} ${eventFilter.date.substring(0,2)}, ${eventFilter.date.substr(6)}</p><p><strong>${eventFilter.event.theme.title}</strong></p></li>`;
  // unOrder.innerHTML = listInner;
  // return unOrder;
}

function hasLookupName(evnt) {
    const { event: {headline, guests} } = evnt;
    return (headline == lookupName || guests.indexOf(lookupName) != -1);
}

  const out = perfdata.filter(hasLookupName).map(generateEventList).join('');
// console.log(out);

  eventList.innerHTML = out;  
    
  function tryThisAgain(lookup) {
      // if (apps.length) apps = [];
      eventList.innerHTML = "";
      ttlapps = 0;
      let sizeCheck = (apps.length) ? true : false;
      if (sizeCheck) apps.splice(0,apps.length);

      perfdata.forEach(function(evnt) {
        var d = evnt.date.substr(6);
        const d4 = new Date(Date.parse(getInitialDate(evnt.date)));
        var [ convertDay, convertMonth, convertYear ] = evnt.date.split("/");
        const { event: {headline, guests} } = evnt;
        const { month, date, event: {theme: {title} } } = evnt;
        const lineup = [headline, ...guests];
          // Push each performer name into master appearance array
          for (var y = 0; y < lineup.length; y++) { 
            if (fullNameList.indexOf(lineup[y]) == -1) {
              fullNameList.push(lineup[y]);
            }
          }

        if (headline == lookup || guests.indexOf(lookup) != -1) {
          var g = guests.indexOf(lookup);
          apps.push(`${evnt.month} ${evnt.date.substring(0,2)}, ${evnt.date.substr(6)}`);
          if (g == -1) {
            ttlapps += 1;
            // apps[ttlapps-1] = apps[ttlapps-1] + '(*)';
          }

        }
      
      });
    let returnArray = apps;
    // apps.splice(0,apps.length);
    return returnArray;
  }
    
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    let data = new FormData(form);
    let userId = data.get('title');
    let testArr = [];

    testArr = tryThisAgain(userId);
    lookupName = userId;

    // testArr.splice(0,testArr.length);

    const values = [...data.entries()];
    for (let entry of data) {
      console.log(entry[entry.length-1]);
    }
    for (let [key, value] of data) {
      console.log(key);
      console.log(value);
    }

      
  const out = perfdata.filter(hasLookupName).map(generateEventList).join('');
// console.log(out);

  eventList.innerHTML = out;
      fillAppearDetails(userId, testArr);
    form.reset();
  });
    

  function fillAppearDetails (id, arr) {
        test.innerHTML = `<ul>
      <div class="list-container">
        <li>
          <span>${id}</span>
          <p class="uppercase-light">Name</p>
        </li>      
      </div>
      <div class="list-container">
        <li>
          <span>${arr.length}</span>
          <p class="uppercase-light">Appearances</p>      
        </li>      
      </div>
      </div>
      <div class="list-container">
        <li>
          <span>${ttlapps}</span>
          <p class="uppercase-light">Headlines</p>
        </li>      
      </div>
      <div class="list-container">
        <li>
          <span>${arr.length - ttlapps}</span>
          <p class="uppercase-light">Guest</p>
        </li>      
      </div>  
      <div class="list-container">
        <li>
          <span>${arr[0]}</span>
          <p class="uppercase-light">Appeared First</p>      
        </li>      
      </div>
      <div class="list-container">
        <li>
          <span>${arr[arr.length-1]}</span>
          <p class="uppercase-light">Most Recent</p>      
        </li>      
    </ul>`;
  }
    
});
