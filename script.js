const config = document.querySelector('.config');
const configExist = document.querySelector('.dashboardExit');
const dashboard = document.querySelector('.dashboard');
const startButton = document.querySelector('#startButton');
const draftWindow = document.querySelector('.draftWindow');
const memberName = document.querySelector('.draftWindow .memberName');
const memberCode = document.querySelector('.draftWindow .memberCode');
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
    draftWindow.classList.add('start');
}

config.addEventListener('click', showMembersTable)
configExist.addEventListener('click', hideMembersTable)

async function getMembers() {
    await fetch('./members.json').then(res => {
        res.json().then(members => {
            trackMembers = members;
            console.log(trackMembers.randomize());
            members.forEach(member => {
                const memberItem = document.createElement('tr');

                const memberItemName = document.createElement('td');
                memberItemName.textContent = member.name;
                memberItem.appendChild(memberItemName);

                const memberItemCode = document.createElement('td');
                memberItemCode.textContent = member.code;
                memberItem.appendChild(memberItemCode);

                membersTable.appendChild(memberItem);
            })

            memberName.textContent = trackMembers[members.randomize()].name;
            memberCode.textContent = trackMembers[members.randomize()].code;

            startButton.addEventListener('click', e => {
                startPicking();

                let pick = setInterval(e => {
                    memberName.textContent = trackMembers[members.randomize()].name;
                    memberCode.textContent = trackMembers[members.randomize()].code;
                }, 30);

                setTimeout(e => {
                    clearInterval(pick);
                    draftWindow.classList.remove('start');
                    confetti.start();
                    setTimeout(e => {
                        confetti.stop();
                    }, 2000)
                }, 2000);
            })
        })
    });
}

getMembers();