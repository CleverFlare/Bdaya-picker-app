const config = document.querySelector('.config');
const configExist = document.querySelector('.dashboardExit');
const dashboard = document.querySelector('.dashboard');
const startButton = document.querySelector('#startButton');
const pickWindow = document.querySelector('.pickWindow');
const memberName = document.querySelector('.pickWindow .memberName');
const membersTable = document.querySelector('.membersTable tbody');

let candidates;

Array.prototype.randomize = function() {
    return Math.floor(Math.random() * this.length);
}

function showMembersTable(event) {
    dashboard.classList.add('show');
}

function hideMembersTable(event) {
    dashboard.classList.remove('show');
}

function startPicking() {
    pickWindow.classList.add('start');
}

config.addEventListener('click', showMembersTable)
configExist.addEventListener('click', hideMembersTable)

function updateCnadidates(candidateTableValue) {
    const memberItem = document.createElement('tr');

    const memberItemName = document.createElement('td');
    memberItemName.textContent = candidateTableValue;
    memberItem.appendChild(memberItemName);

    membersTable.appendChild(memberItem);
}

function startRandomPick(clickEvent) {
    if(pickWindow.classList.contains('start')) return;
    
    startPicking();

    let pick = setInterval(()=>{ memberName.textContent = candidates[candidates.randomize()] } , 30);

    function startAndEndConfetti() 
    {
        clearInterval(pick);
        pickWindow.classList.remove('start');
        confetti.start();
        setTimeout(()=>{ confetti.stop() }, 2000)
    }

    setTimeout(startAndEndConfetti, 2000);
}

async function getMembers() {

    function responseJsonForm(members) {

        if(members.length === 0) 
        {
            memberName.textContent = 'No member has been provided';
            updateCnadidates('empty');
            return;
        }

        candidates = members;

        for(let member of members) updateCnadidates(member);

        memberName.textContent = candidates[members.randomize()];

        startButton.addEventListener('click', startRandomPick)
    }

    function fetchResponse(response) {
        response.json().then(responseJsonForm);
    }

    await fetch('./members.json').then(fetchResponse);
}

window.onload = getMembers();