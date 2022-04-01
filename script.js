const config = document.querySelector('.config');
const configExist = document.querySelector('.dashboardExit');
const dashboard = document.querySelector('.dashboard');
const startButton = document.querySelector('#startButton');
const pickWindow = document.querySelector('.pickWindow');
const memberName = document.querySelector('.pickWindow .memberName');
const membersTable = document.querySelector('.membersTable tbody');

let trackMembers;

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

async function getMembers() {

    await fetch('./members.json').then(res => {
        res.json().then(members => {
            if(members.length === 0) {
                memberName.textContent = 'No member has been provided';
                const memberItem = document.createElement('tr');

                const memberItemName = document.createElement('td');
                memberItemName.textContent = 'empty';
                memberItem.appendChild(memberItemName);

                membersTable.appendChild(memberItem);
            } else {
                trackMembers = members;
                for(let member of members) {
                    const memberItem = document.createElement('tr');

                    const memberItemName = document.createElement('td');
                    memberItemName.textContent = member;
                    memberItem.appendChild(memberItemName);

                    membersTable.appendChild(memberItem);
                }

                memberName.textContent = trackMembers[members.randomize()];

                startButton.addEventListener('click', e => {
                    if(pickWindow.classList.contains('start')) return;
                    startPicking();

                    let pick = setInterval(e => {
                        memberName.textContent = trackMembers[members.randomize()];
                    }, 30);

                    setTimeout(e => {
                        clearInterval(pick);
                        pickWindow.classList.remove('start');
                        confetti.start();
                        setTimeout(e => {
                            confetti.stop();
                        }, 2000)
                    }, 2000);
                })
            }
        })
    });
}

getMembers();