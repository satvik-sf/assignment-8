
function init(){
    setUpTime();
    showUsers();

}


enum Role { SUPERADMIN = 0, ADMIN = 1, SUBSCRIBER=2 };

class User{
    first_name : string;
    last_name : string;
    email : string;
    phone : string;
    address :string;
    role: Role;

    constructor(fn: string, ln: string, email: string, phone: string, address: string, role:Role){
        this.first_name = fn;
        this.last_name = ln;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }
}

let users: Array<User>= [];

// console.log(typeof Role[0]);

for(let i:number = 1; i <= 10; i++){
    // console.log(Role[0]);
    let u: User = new User(i.toString(), i.toString(),i.toString(),i.toString(),i.toString(), Role[i%3]); // ??????
    users.push(u);
}

// for(let i=0;i<users.length;i++){
//     console.log(users[i].role);
// }

function showUsers(){
    let t = document.getElementById("users");
    // console.log(t);
    if(t){
        t.remove();
    }

    let table: HTMLTableElement = <HTMLTableElement>document.createElement("table"); 
    let tr = table.insertRow(-1);
    let hEl = ["First Name", "Last Name", "Email", "Phone Number", "Role", "Address"];
    table.className = 'table table-hover';
    table.id = "users";
    for (let i = 0; i < hEl.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = hEl[i];
        tr.appendChild(th);
    }
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));

    for(let i = 0;i < users.length; i++){

        tr = table.insertRow(-1);
        let c1 = tr.insertCell(-1);
        c1.innerHTML = users[i].first_name;

        let c2 = tr.insertCell(-1);
        c2.innerHTML = users[i].last_name;
        

        let c3 = tr.insertCell(-1);
        c3.innerHTML = users[i].email;


        let c4 = tr.insertCell(-1);
        c4.innerHTML = users[i].phone;


        let c5 = tr.insertCell(-1);
        c5.innerHTML = users[i].role.toString();

        let c6 = tr.insertCell(-1);
        c6.innerHTML = users[i].address;

        let cells: Array<HTMLElement> = [];

        
        for (let j = 0, col: HTMLElement; col = table.rows[i+1].cells[j]; j++) {
            cells.push(col);
            // console.log(col);
        }

        let edit = document.createElement('button');
        edit.innerHTML = 'Edit';
        edit.className = 'btn btn-primary';
        edit.addEventListener('click', () => { editUser(i, cells) });
        let c7 = tr.insertCell(-1);
        c7.appendChild(edit);

        let del = document.createElement('button');
        del.innerHTML = 'Delete';
        del.className = 'btn btn-danger';
        del.addEventListener('click', ()  => { delUser(i) });
        let c8 = tr.insertCell(-1);
        c8.appendChild(del);

        let save = document.createElement('button');
        save.innerHTML = 'Save';
        save.className = 'btn btn-info';
        save.addEventListener('click', ()  => { saveUser(i, cells) });
        let c9 = tr.insertCell(-1);
        c9.appendChild(save);
        c9.style.display = 'none';
        cells.push(c9);

        let cancel = document.createElement('button');
        cancel.innerHTML = 'Cancel';
        cancel.className = 'btn btn-secondary';
        cancel.addEventListener('click', ()  => { cancelFn(cells) });
        let c10 = tr.insertCell(-1);
        c10.appendChild(cancel);
        c10.style.display = 'none';
        cells.push(c10);
        
    }

    let container = document.getElementById("showData")!;
    document.getElementById("loadDataBtn").style.display = "none";
    container.appendChild(table);
}


function editUser(idx: number,cells: Array<HTMLElement>){
    // make row editable
    // .setAttribute("contenteditable", "false");
    for(let i = 0; i < cells.length-2; i++ ){
        // console.log(cells[i]);
        cells[i].setAttribute("contenteditable", "true");
    }
    // Show SAVE AND CANCEL BUTTON
    console.log(cells[cells.length-1]);
    cells[cells.length-1].style.display = 'inline-block';
    cells[cells.length-2].style.display = 'inline-block';

    // showUsers();
}

function delUser(idx: number){
    users.splice(idx, 1);
    showUsers();
}

function saveUser(idx: number, cells: Array<HTMLElement>){
    console.log(cells[4].innerHTML);
    let r: Role;
    let x: string = cells[4].innerHTML;
    if(x === 'ADMIN')r = Role.ADMIN;
    if(x === 'SUPERADMIN')r = Role.SUPERADMIN;
    if(x === 'SUBSCRIBER')r = Role.SUBSCRIBER;
    console.log(r);
    let u: User = new User(cells[0].innerHTML, cells[1].innerHTML,cells[2].innerHTML, cells[3].innerHTML, cells[5].innerHTML, r );
    users[idx] = u;
    showUsers(); 
} 

function cancelFn (cells: Array<HTMLElement>){
    for(let i = 0; i < cells.length-2; i++ ){
        // console.log(cells[i]);
        cells[i].setAttribute("contenteditable", "false");
    }
    cells[cells.length-1].style.display = 'none';
    cells[cells.length-2].style.display = 'none';
    showUsers();
}

function setUpTime(){
    let time = document.getElementById("time")! as HTMLInputElement;
    // console.log(time);
    time.innerHTML = new Date().toLocaleString();
    setInterval(function () {
        time.innerHTML = new Date().toLocaleString();
    }, 1000);
}
