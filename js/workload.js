
const workShowTable = document.querySelectorAll('.workload table tr:nth-child(2)');
const workload = document.querySelector('.workload');
const workTable1 = workload.querySelector('#tablehide');
const workTable2 = workload.querySelector('#benefits');
const workTable3 = workload.querySelector('#benefitsdrop');
const workTab2Append = workload.querySelector('#benefits .tableprogian');
const workTab3Append = workload.querySelector('#benefitsdrop .tableprogian');
const workTab2tr = workload.querySelector('#benefits table tbody');
const workTab3tr = workload.querySelector('#benefitsdrop table tbody');
const workProjOpt = workload.querySelectorAll('.project .select-box .options-container .option');
const workResOpt = workload.querySelectorAll('.resource .popsearch .d-flex');
const prevWork = document.querySelector('.workload .slide_bottom .img1');
const nextWork = document.querySelector('.workload .slide_bottom .img2');
// const monthData = workload.querySelector('#benefitsdrop th select');
// const monthData2 = workload.querySelector('#benefits th select');
const selectData3 = workload.querySelector('#benefits .thspace select');
const selectData2 = workload.querySelector('#benefitsdrop .thspace select');
let workYear = 2021, workMonNum = 1, workMonNum2 = 0, workMonCount = 0, fixedHeight = 30, combinedVal = [], dateVal = [],
monthVal = [], yearVal = [];
let workMonText, workYearText, selectInput2 = 'Days', projName, dropProjTip, dropTaskTip, hoverEmpName, projInd, resInd, resName, resTip;
let preventFun = {}, gbMonText, gbYearText;
let workMonYear, workNextMonInd, workQuaYear, workNextQuaInd, workYearlyYear, workNextYearInd, UniMarLeft2, UniRemWidth2;
// pushing task

// for(let i=0; i<WorkProject.length; i++)
// {
//     let alltask = [];
//     let task = {};
//     for(let j=0; j<WorkProject[i].employee.length; j++)
//     {
//         for(let k=0; k<WorkProject[i].employee[j].task.length; k++)
//         {
//             alltask.push(WorkProject[i].employee[j].task[k]);
//         }   
//     }
//     task = [...alltask];
//     let obj = {...task};
//     WorkProjTip.push(obj);
// }

selectData2.addEventListener('change', (e) => {
    selectInput2 = selectData2.options[selectData2.selectedIndex].value;
    gbMonText = e.target.closest('.tablecal').querySelector('.thspace span');
    gbYearText = e.target.closest('.tablecal').querySelector('.thspace p');

    switch (selectInput2) {
        case 'Days': {
            let alltr = workload.querySelectorAll('#benefitsdrop table tr');
            gbMonText.classList.remove('white');
            switchDays(alltr);
            assignWorkDate();
            calWorkTaskProjBar(projInd);
            break;
        }
        case 'Month': {
            let alltr = workload.querySelectorAll('#benefitsdrop table tr');
            switchMonth(alltr);
            let Mname = workload.querySelectorAll('#benefitsdrop tr th.VDate');
            assignWorkMonth(Mname,gbMonText,gbYearText);
            calWorkTaskProjBar(projInd);
            break;
        }
        case 'Quarter': {
            let alltr = workload.querySelectorAll('#benefitsdrop table tr');
            switchQuarter(alltr);
            let Qname = workload.querySelectorAll('#benefitsdrop tr th.VQuarter');
            assignWorkQuarter(Qname,gbMonText,gbYearText);
            calWorkTaskProjBar(projInd);
            break;
        }
        case 'Year': {
            let alltr = workload.querySelectorAll('#benefitsdrop table tr');
            switchYear(alltr);
            let Yname = workload.querySelectorAll('#benefitsdrop tr th.VYear');
            assignWorkYear(Yname,gbMonText,gbYearText);
            calWorkTaskProjBar(projInd);
            break;
        }
    }
})

selectData3.addEventListener('change', (e) => {
    selectInput2 = selectData3.options[selectData3.selectedIndex].value;
    gbMonText = e.target.closest('.tablecal').querySelector('.thspace span');
    gbYearText = e.target.closest('.tablecal').querySelector('.thspace p');

    switch (selectInput2) {
        case 'Days': {
            let alltr = workload.querySelectorAll('#benefits table tr');
            gbMonText.classList.remove('white');
            switchDays(alltr);
            assignWorkDate();
            calWorkTaskResBar(resInd);
            break;
        }
        case 'Month': {
            let alltr = workload.querySelectorAll('#benefits table tr');
            switchMonth(alltr);
            let Mname = workload.querySelectorAll('#benefits tr th.VDate');
            assignWorkMonth(Mname,gbMonText,gbYearText);
            calWorkTaskResBar(resInd);
            break;
        }
        case 'Quarter': {
            let alltr = workload.querySelectorAll('#benefits table tr');
            switchQuarter(alltr);
            let Qname = workload.querySelectorAll('#benefits tr th.VQuarter');
            assignWorkQuarter(Qname,gbMonText,gbYearText);
            calWorkTaskResBar(resInd);
            break;
        }
        case 'Year': {
            let alltr = workload.querySelectorAll('#benefits table tr');
            switchYear(alltr);
            let Yname = workload.querySelectorAll('#benefits tr th.VYear');
            assignWorkYear(Yname,gbMonText,gbYearText);
            calWorkTaskResBar(resInd);
            break;
        }
    }
})

function switchDays(alltr)
{
    for (let i = 1; i < alltr.length; i++) {
        let alltd = alltr[i].children;
        for (let j = 1; j < alltd.length; j++) {
            if (j > 0 && j < 13) {
                alltd[j].classList.remove('VDate');
                alltd[j].classList.remove('VQuarter');
                alltd[j].classList.remove('VYear');
                alltd[j].style.width = "2.517vw";
                if (alltd[j].classList.contains('deactive')) {
                    alltd[j].classList.remove('deactive');
                }
                continue;
            }
            alltd[j].classList.remove('deactive');
        }
    }
}

function switchMonth(alltr)
{
    for (let i = 1; i < alltr.length; i++) {
        let alltd = alltr[i].children;
        for (let j = 1; j < alltd.length; j++) {
            if (alltd[j].classList.contains('VQuarter') || alltd[j].classList.contains('VYear')) {
                alltd[j].classList.remove('VQuarter');
                alltd[j].classList.remove('VYear');
            }
            if (j > 0 && j < 13) {
                if (i == 1) {
                    alltd[j].classList.add('VDate');
                }
                alltd[j].classList.remove('deactive');
                alltd[j].style.width = "6.575vw";
                continue;
            }
            alltd[j].classList.add('deactive');
        }
    }
}

function switchQuarter(alltr)
{
    for (let i = 1; i < alltr.length; i++) {
        let alltd = alltr[i].children;
        for (let j = 1; j < alltd.length; j++) {
            if (alltd[j].classList.contains('VDate') || alltd[j].classList.contains('VYear')) {
                alltd[j].classList.remove('VDate');
                alltd[j].classList.remove('VYear');
            }
            if (j > 0 && j < 5) {
                if (i == 1) {
                    alltd[j].classList.add('VQuarter');
                }
                alltd[j].classList.remove('deactive');
                alltd[j].style.width = "19.725vw";
                continue;
            }
            alltd[j].classList.add('deactive');
        }
    }
}

function switchYear(alltr)
{
    for (let i = 1; i < alltr.length; i++) {
        let alltd = alltr[i].children;
        for (let j = 1; j < alltd.length; j++) {
            if (alltd[j].classList.contains('VDate') || alltd[j].classList.contains('VQuarter')) {
                alltd[j].classList.remove('VDate');
                alltd[j].classList.remove('VQuarter');
            }
            if (j > 0 && j < 3) {
                if (i == 1) {
                    alltd[j].classList.add('VYear');
                }
                alltd[j].classList.remove('deactive');
                alltd[j].style.width = "39.45vw";
                continue;
            }
            alltd[j].classList.add('deactive');
        }
    }
}

function assignWorkMonth(Mname,monText,yearText) {
    let appearYear = yearText.innerText;
    workMonYear = appearYear;
    workNextMonInd = 0;
    loopWorkMonName(Mname, workNextMonInd, monText, yearText);
}

function loopWorkMonName(Mname, monthIndex, monText, yearText) {
    let localMonInd = monthIndex;
    monText.classList.add('white');
    yearText.innerText = `${workMonYear}`;
    for (let i = 0; i < Mname.length; i++) {
        Mname[i].innerHTML = `<p>${month[localMonInd]}</p>`;
        localMonInd++;
    }
}

function assignWorkQuarter(Qname,monText,yearText) {
    let appearYear = yearText.innerText;
    workQuaYear = appearYear;
    workNextQuaInd = 0;
    loopWorkQuaName(Qname, workNextQuaInd, monText, yearText);
}

function loopWorkQuaName(Qname, nextQuaInd, monText, yearText) {
    let localQuaInd = nextQuaInd;
    monText.classList.add('white');
    yearText.innerText = `${workQuaYear}`;
    for (let i = 0; i < Qname.length; i++) {
        switch (i) {
            case 0: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Jan-Mar</span>`;
                localQuaInd++;
                break;
            }
            case 1: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Apr-Jun</span>`;
                localQuaInd++;
                break;
            }
            case 2: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Jul-Sep</span>`;
                localQuaInd++;
                break;
            }
            case 3: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Oct-Dec</span>`;
                localQuaInd++;
                break;
            }
        }
    }
}

function assignWorkYear(Yname,monText,yearText) {
    let appearYear = yearText.innerText;
    workYearlyYear = appearYear;
    workNextYearInd = 0;
    loopWorkYearName(Yname, workNextYearInd, monText, yearText);
}

function loopWorkYearName(Yname, nextYearInd, monText, yearText) {
    let localYearInd = nextYearInd;
    monText.classList.add('white');
    yearText.innerText = `${workYearlyYear}`;
    for (let i = 0; i < Yname.length; i++) {
        switch (i) {
            case 0: {
                Yname[i].innerHTML = `<p>Jan-Jun</p>`;
                localYearInd++;
                break;
            }
            case 1: {
                Yname[i].innerHTML = `<p>Jul-Dec</p>`;
                localYearInd++;
                break;
            }
        }
    }
}

// monthData.addEventListener('change', (e) => {
//     let monthInput = monthData.options[monthData.selectedIndex].value;
//     let num = +getNumericMonth(monthInput);
//     workMonNum2 = num;
//     workMonCount = num;
//     num = num+1;
//     workYear = e.target.closest('th').querySelector('p').innerText; 
//     workMonNum = num;
//     getWorkMonLength();
//     assignWorkDate();
//     calWorkTaskProjBar(projInd);
// })
// monthData2.addEventListener('change', (e) => {
//     let monthInput = monthData2.options[monthData2.selectedIndex].value;
//     let num = +getNumericMonth(monthInput);
//     workMonNum2 = num;
//     workMonCount = num;
//     num = num+1;
//     workYear = e.target.closest('th').querySelector('p').innerText; 
//     workMonNum = num;
//     getWorkMonLength();
//     assignWorkDate();
//     calWorkTaskResBar(resInd);
// })

function getWorkMonLength()
{
    workMonLen = new Date(workYear, workMonNum, 0).getDate();
}
getWorkMonLength();

function assignWorkDate()
{
    for(let j=0; j<workShowTable.length; j++)
    {
        let workShowDate = workShowTable[j].querySelectorAll('table tr:nth-child(2) th');
        let workMonText = workShowTable[j].closest('table').querySelector('.thspace span');
        let localYearText = workShowTable[j].closest('table').querySelector('.thspace p');
        workMonText.innerText=`${month[workMonCount]}`;
        localYearText.innerText=`${workYear}`;
        workShowDate.forEach((show)=>
        {
            show.classList.remove('dateVirtual');
        })
        for(let i=1; i<workMonLen+1; i++)
        {
            let dayName = new Date(workYear, workMonNum2, i).toString().substr(0,3);
            workShowDate[i].classList.add('dateVirtual');
            workShowDate[i].innerHTML=`${dayName} <p>${i}</p>`;
        }
    }
    workMonText = document.querySelectorAll('.workload table .thspace span');
    workYearText = document.querySelectorAll('.workload table .thspace p');
}
assignWorkDate();

nextWork.addEventListener('click',()=>
{
    switch(selectInput2)
    {
        case 'Days':
        {
            workMonCount++;
            workMonNum++;
            workMonNum2++;
            if(workMonCount>11)
            {
                workMonCount=0;
                workYear++;
                workMonNum=1;
                workMonNum2=0;
            }
            getWorkMonLength();
            assignWorkDate();
            break;
        }
        case 'Month':
        {
            workNextMonInd = 0;
            workMonYear++;
            let Mname = workload.querySelectorAll('.table tr th.VDate');
            loopWorkMonName(Mname, workNextMonInd, gbMonText, gbYearText);
            break;
        }
        case 'Quarter': 
        {
            workNextQuaInd = 0;
            workQuaYear++;
            let Qname = workload.querySelectorAll('.table tr th.VQuarter');
            loopWorkQuaName(Qname, workNextQuaInd, gbMonText, gbYearText);
            break;
        }
        case 'Year': 
        {
            workNextYearInd = 0;
            workYearlyYear++;
            let Yname = workload.querySelectorAll('.table tr th.VYear');
            loopWorkYearName(Yname, workNextYearInd, gbMonText, gbYearText);
            break;
        }
    }
    
    if(preventFun.data === 'workproject')
    {
        calWorkTaskProjBar(projInd);
    }
    else if(preventFun.data === 'workresource')
    {
        calWorkTaskResBar(resInd);
    }
})
prevWork.addEventListener('click',()=>
{
    switch(selectInput2)
    {
        case 'Days':
        {
            workMonCount--;
            workMonNum--;
            workMonNum2--;
            if(workMonCount<0 && workYear>2010)
            {
                workMonCount=11;
                workYear--;
                workMonNum=12;
                workMonNum2=11;
            }
            else if(workMonCount<0 && workYear == 2010)
            {
                workMonCount=0;
                workMonNum=1;
                workMonNum2=0;
                return false;
            }
            getWorkMonLength();
            assignWorkDate();
            break;
        }
        case 'Month':
        {
            workNextMonInd = 0;
            if (workMonYear > 2010) {
                workMonYear--;
            } else if (workMonYear == 2010) {
                return false;
            }
            let Mname = workload.querySelectorAll('.table tr th.VDate');
            loopWorkMonName(Mname, nextMonInd, gbMonText, gbYearText);
            break;
        }
        case 'Quarter': 
        {
            workNextQuaInd = 0;
            if (workQuaYear > 2010) {
                workQuaYear--;
            } else if (workQuaYear == 2010) {
                return false;
            }
            let Qname = workload.querySelectorAll('.table tr th.VQuarter');
            loopWorkQuaName(Qname, workNextQuaInd, gbMonText, gbYearText);
            break;
        }
        case 'Year': 
        {
            let workNextYearInd = 0;
            if (workYearlyYear > 2010) {
                workYearlyYear--;
            } else if (workYearlyYear == 2010) {
                return false;
            }
            let Yname = workload.querySelectorAll('.table tr th.VYear');
            loopWorkYearName(Yname, workNextYearInd, gbMonText, gbYearText);
            break;
        }
    }
    if(preventFun.data === 'workproject')
    {
        calWorkTaskProjBar(projInd);
    }
    else if(preventFun.data === 'workresource')
    {
        calWorkTaskResBar(resInd);
    }
})

workProjOpt.forEach((proj, ind) => {
    proj.addEventListener('click',(e)=>
    {
       let alltr = workload.querySelectorAll('#benefitsdrop table tr:nth-child(2) th');
       alltr.forEach((all)=>
       {
           if(all.classList.contains('VDate') || all.classList.contains('VQuarter') || all.classList.contains('VYear'))
           {
                all.classList.remove('VDate');
                all.classList.remove('VQuarter');
                all.classList.remove('VYear');
           }
       })
       selectInput2 = 'Days';
       preventFun.data = 'workproject';
       projInd = ind;
       let projMonth = +WorkProject[ind].employee[0].task[0].pstartdate.substr(5,2);
       let projYear = +WorkProject[ind].employee[0].task[0].pstartdate.substr(0,4);
       workMonNum = projMonth;
       workYear = projYear
       workMonCount = projMonth - 1;
       getWorkMonLength();
       assignWorkDate();
       let tbody = e.target.closest('.workload').querySelector('#benefitsdrop table tbody');
       if(tbody.children.length>2)
       {
          let vtr = tbody.querySelectorAll('.virtualtr');
          vtr.forEach((vtr)=>
          {
              vtr.remove();
          })
       }
       workTab3Append.innerHTML=``;
       workTable1.style.display="none";
       workTable2.style.display="none";
       workTable3.style.display="block";
       createWorkProj(ind);
       createTaskProj(ind);
       calWorkTaskProjBar(ind);
    })
});

workResOpt.forEach((proj, ind) => {
    proj.addEventListener('click',(e)=>
    {
       let alltr = workload.querySelectorAll('#benefits table tr:nth-child(2) th');
       alltr.forEach((all)=>
       {
           if(all.classList.contains('VDate') || all.classList.contains('VQuarter') || all.classList.contains('VYear'))
           {
                all.classList.remove('VDate');
                all.classList.remove('VQuarter');
                all.classList.remove('VYear');
           }
       })
       selectInput2 = 'Days';
       preventFun.data = 'workresource';
       resInd = ind;
       let projMonth = +WorkResource[ind].project[0].task[0].pstartdate.substr(5,2);
       let projYear = +WorkResource[ind].project[0].task[0].pstartdate.substr(0,4);
       workMonNum = projMonth;
       workYear = projYear
       workMonCount = projMonth - 1;
       getWorkMonLength();
       assignWorkDate();
       let tbody = e.target.closest('.workload').querySelector('#benefits table tbody');
       let empname = e.target.closest('.workload').querySelector('#benefits table tbody div>img + p');
       if(tbody.children.length>2)
       {
          let vtr = tbody.querySelectorAll('.virtualtr');
          vtr.forEach((vtr)=>
          {
              vtr.remove();
          })
       }
       workTab2Append.innerHTML=``;
       workTable1.style.display="none";
       workTable2.style.display="block";
       workTable3.style.display="none";
       createWorkRes(empname,ind);
       createWorkTaskResBar(ind);
       calWorkTaskResBar(ind);
    })
});

function createWorkRes(empname,i)
{
    empname.innerText = WorkResource[i].employeename;
    for(let j=0; j<WorkResource[i].project.length; j++)
    {
        let res = document.createElement('div');
        res.setAttribute('class','resource'); 
        let tr = document.createElement('tr');
        j === WorkResource[i].project.length - 1 ? tr.setAttribute('class',`borderdot virtualtr`) : tr.setAttribute('class',`virtualtr`);       
        tr.innerHTML=`
                    <td class="text-center dot" style="width: 10.3vw"> 
                        <div></div><span>${WorkResource[i].project[j].projectname}</span>
                    </td>
                    <td style="border-left: 1px solid #0000000D;"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
        `;
        res.innerHTML=`
        <div class="tablepro">
            <div class="taskList">
            <div class="textdiv">
                <div></div>
                <p>${WorkResource[i].project[j].projectname}</p>
            </div>
            </div>
        </div>  
        `;
        workTab2tr.append(tr);
        workTab2Append.insertBefore(res, workTab2Append.children[j]);
    }
    hoverEmpName2 = workload.querySelectorAll('#benefits .tableprogian .tablepro .textdiv p');
    resName = workload.querySelectorAll('#benefits .resource');
}

function createWorkTaskResBar(i)
{
    for(let j=0; j<WorkResource[i].project.length; j++)
    {
        let text = WorkResource[i].project[j].projectname;
        let taskAppend = resName[j].querySelector('.taskList');
        for(let k=0; k<WorkResource[i].project[j].task.length; k++)
        {
            let progress = document.createElement('div');
            progress.setAttribute('class','progress');
            let task_bar = document.createElement('div');
            task_bar.setAttribute('class','progress-bar');
            task_bar.setAttribute('empInd',`${j}`);
            task_bar.setAttribute('taskInd',`${k}`);
            progress.appendChild(task_bar);
            taskAppend.appendChild(progress);
            let insideTask = taskAppend.querySelectorAll('.progress');
            if(insideTask.length>=2 && k == WorkResource[i].project[j].task.length - 1)
            {
                dynamCrtRestr(insideTask, text, taskAppend);
            }
            // if(j>=1)
            // {
            //     let tableprog =  taskAppend.closest('.tableprogian');
            //     let tablepro =  taskAppend.closest('.tablepro');
            //     let allTask = tableprog.querySelectorAll('.resource .taskList .progress');
            //     let currTask = taskAppend.querySelectorAll('.progress');
            //     let mulnum = allTask.length - currTask.length;
            //     tablepro.style.top = `${(80*mulnum)+ 84}px`;
            // }
        }
    }
    let dropResTaskTip = workload.querySelectorAll('#benefits .taskList .progress .progress-bar');
    for(let ind=0; ind<dropResTaskTip.length; ind++)
    {
        ['mouseover','mouseout'].forEach((e)=>
        {
            dropResTaskTip[ind].tipind = ind;
            dropResTaskTip[ind].addEventListener(e, showDropResTaskTip);
        })
    }
}

function dynamCrtRestr(insideTask, text, taskAppend)
{
    let firsttd = taskAppend.closest('#benefits').querySelectorAll('table tbody tr td span');
    firsttd.forEach((td)=>
    {
        if(td.innerText.includes(text))
        {
            let closesttr = td.closest('tr');
            let tbody = td.closest('tbody');
            let alltr = td.closest('tbody').querySelectorAll('tr');
            let index = Array.from(alltr).indexOf(closesttr);
            for(let trind=0; trind<insideTask.length - 3; trind++)
            {
                let tr = document.createElement('tr');
                tr.setAttribute('class','virtualtr');
                tr.innerHTML=`
                <td style="width: 10.3vw; border-right: none;"></td>
                <td style="border-left: 1px solid #0000000D;"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                `;
                tbody.insertBefore(tr, tbody.children[index + 1]);
            }
        }
    })
}

function createWorkProj(i)
{
    let proj = document.createElement('div');
    proj.setAttribute('class',`projectname`);
    for(let j=0; j<WorkProject[i].employee.length; j++)
    {
        let employee = document.createElement('div');
        employee.setAttribute('class',`employee`);
        employee.innerHTML=`
                <!--progressbar-->
                <div class="tablepro tableproben">
                    <div class="taskProj"></div>
                </div>
                <div class="img_emp"><img src="img/client1.jpg" class="mr-2" alt=""><div class="text_div">${WorkProject[i].employee[j].employeename}</div></div>
                <div class="border-bottom"> 
        `
        proj.appendChild(employee);
    }
    workTab3Append.insertBefore(proj, workTab3Append.children[i]);
    for(let j=0; j<WorkProject[i].employee.length + 1; j++)
    {
        let tr = document.createElement('tr');
        tr.setAttribute('class',`virtualtr`);
        tr.innerHTML=`
                    <td class="text-center" style="width: 10.9vw;"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
        `;
        workTab3tr.appendChild(tr);
    }
   projName = workload.querySelector('#benefitsdrop .projectname');
   hoverEmpName = workload.querySelectorAll('#benefitsdrop .projectname .employee div.text_div');
}

function createTaskProj(i)
{
    let taskAppend = projName.querySelectorAll('.taskProj');
    for(let j=0; j<WorkProject[i].employee.length; j++)
    {
        for(let k=0; k<WorkProject[i].employee[j].task.length; k++)
        {
            let progress = document.createElement('div');
            let progress_bar = document.createElement('div');
            progress_bar.setAttribute('empInd',`${j}`);
            progress_bar.setAttribute('taskInd',`${k}`);
            progress.setAttribute('class','progress');
            progress_bar.setAttribute('class','progress-bar');
            progress.appendChild(progress_bar);
            taskAppend[j].appendChild(progress);
        }
    }
}

function calWorkTaskProjBar(k)
{
    let mobileWidth = body.clientWidth;
    let employee = projName.querySelectorAll('.employee');
    for(let j=0;j<WorkProject[k].employee.length;j++)
    {
        fixedHeight = 40;
        let projTask = employee[j].querySelectorAll('.taskProj .progress .progress-bar');
        for(let i=0; i<WorkProject[k].employee[j].task.length; i++)
        {
            let date1 = new Date(WorkProject[k].employee[j].task[i].pstartdate.substr(0,10).toString());
            let date2 = new Date(WorkProject[k].employee[j].task[i].penddate.substr(0,10).toString());
            let projStartInd = +WorkProject[k].employee[j].task[i].pstartdate.substr(5, 2);
            let projStartMon = month[--projStartInd].substr(0, 3);
            let projEndInd = +WorkProject[k].employee[j].task[i].penddate.substr(5, 2);
            let getMonthIndex = getNumericMonth(projStartMon);
            let startYear = WorkProject[k].employee[j].task[i].pstartdate.substr(0,4);
            let compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            let monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = WorkProject[k].employee[j].task[i].penddate.substr(8,2);
            let mileEndYear = +WorkProject[k].employee[j].task[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = WorkProject[k].employee[j].task[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            let prevYear = checkWorkPrevYear(appearYear, mileEndYear, mileStartYear, i, projTask);
            let mileStartDate = WorkProject[k].employee[j].task[i].pstartdate.substr(8,2);
            let startMText = projStartMon;
            let minusVal = +mileStartDate;
            let hval = 10;
            let mlval = 10.15;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,mileStartDate);
                        showWorkload(daysCount,endTimeline,i,projTask,mobileWidth,hval,mlval,mileEndYear,projEndInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            adjustHeight(employee,j,i);
            giveWorkTaskbG(i,j,k,projTask);
        }
    }
    makingEmpTooltip();
}

function calWorkTaskResBar(k)
{
    let mobileWidth = body.clientWidth;
    let resource = workload.querySelectorAll('#benefits .resource');
    for(let j=0;j<resource.length;j++)
    {
        let projTask = resource[j].querySelectorAll('.taskList .progress .progress-bar');
        for(let i=0; i<projTask.length; i++)
        {
            let date1 = new Date(WorkResource[k].project[j].task[i].pstartdate.substr(0,10).toString());
            let date2 = new Date(WorkResource[k].project[j].task[i].penddate.substr(0,10).toString());
            let projStartInd = +WorkResource[k].project[j].task[i].pstartdate.substr(5, 2);
            let projStartMon = month[--projStartInd].substr(0, 3);
            let projEndInd = +WorkResource[k].project[j].task[i].penddate.substr(5, 2);
            let getMonthIndex = getNumericMonth(projStartMon);
            let startYear = WorkResource[k].project[j].task[i].pstartdate.substr(0,4);
            let compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            let monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = WorkResource[k].project[j].task[i].penddate.substr(8,2);
            let mileEndYear = WorkResource[k].project[j].task[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = WorkResource[k].project[j].task[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            prevYear = checkWorkPrevYear(appearYear, mileEndYear, mileStartYear, i, projTask);
            let mileStartDate = WorkResource[k].project[j].task[i].pstartdate.substr(8,2);
            let startMText = projStartMon;
            let minusVal = +mileStartDate;
            let hval = 10;
            let mlval = 10.24;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,mileStartDate);
                        showWorkload(daysCount,endTimeline,i,projTask,mobileWidth,hval,mlval,mileEndYear,projEndInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,mileEndYear,
                            projStartInd,projEndInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            giveResTaskbG(i,j,k,projTask);
            checkAllTask(projTask,i);
        }
    }
    makingEmpTooltip2();
}

function showWorkload(daysCount,endTimeline,i,workTimeline,mobileWidth,hval,mlval,taskEndYear,taskEndInd)
{
    let totWidth = workTimeline[i].closest('.tablecal').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;

    switch(selectInput2)
    {
        case 'Days':
        {
            switch(true){
                case (daysCount<=30):
                {
                    if(dateText===month1)
                    {
                        let ganttWidth = (daysCount +1) * 2.5;
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                        workTimeline[i].closest('.progress').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile1(i,daysCount,workTimeline);
                            }
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;
                }      
                case (daysCount>30 && daysCount<=58):
                {
                    if(dateText===month1)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                        workTimeline[i].closest('.progress').style.display="block";
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month2)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval); 
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>58 && daysCount<=89):
                {
                    if(dateText===month1 || dateText===month2)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block"; 
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month3)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>89 && daysCount<=119):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month4)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>119 && daysCount<=150):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month5)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>150 && daysCount<=180):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month6)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>180 && daysCount<=211):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month7)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>211 && daysCount<=242):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6
                        || dateText===month7)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month8)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>242 && daysCount<=272):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6
                        || dateText===month7 || dateText===month8)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month9)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>272 && daysCount<=303):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6
                        || dateText===month7 || dateText===month8 || dateText===month9)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month10)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>303 && daysCount<=333):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6
                        || dateText===month7 || dateText===month8 || dateText===month9
                        || dateText===month10)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month11)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>333 && daysCount<=365):
                {
                    if(dateText===month1 || dateText===month2 || dateText===month3
                        || dateText===month4 || dateText===month5 || dateText===month6
                        || dateText===month7 || dateText===month8 || dateText===month9
                        || dateText===month10 || dateText===month11)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month12)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);      
                    }
                    else 
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }    
            }
            break;
        }
        case 'Month': {
            let Mname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VDate p');
            let monthText1 = `${Mname[0].innerText} ${workMonYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1) {
                        let ganttWidth = getWorkCommonWidth(taskEndYear, taskEndInd, endTimeline, Mname);
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw; height:${hval}px`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${workQuaYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getWorkCommonWidth(taskEndYear, taskEndInd, endTimeline, Qname);
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw; height:${hval}px`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VYear p');
            let quarter1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1.includes('JAN')) {
                quarterText1 = `january ${workYearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getWorkCommonWidth(taskEndYear, taskEndInd, endTimeline, Yname);
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw; height:${hval}px`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }               
}
function showAlterWorkload(daysCount,endTimeline,i,workTimeline,startTime,startMText,minusVal,mobileWidth,hval,mlval,
    taskEndYear,taskStartInd,taskEndInd)        
{
    startTime = +startTime -1;
    let totWidth = workTimeline[i].closest('.tablecal').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;
    updateValue(startMText,minusVal);
    switch(selectInput2)
    {
        case 'Days':
        {
            switch(true)
            {
                case (daysCount<=val1):
                {
                    if(dateText===month1)
                    {
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = (daysCount +1) *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,daysCount,workTimeline);               
                            }
                    }        
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;
                }
                case (daysCount>val1 && daysCount<=val2):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2)
                    {                
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw`;
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val2 && daysCount<=val3):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }  
                    }
                    else if(dateText===month2)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(dateText===month3)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val3 && daysCount<=val4):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(dateText===month4)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val4 && daysCount<=val5):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(dateText===month5)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val5 && daysCount<=val6):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month6)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val6 && daysCount<=val7):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month7)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val7 && daysCount<=val8):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6 || dateText===month7)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month8)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val8 && daysCount<=val9):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6 || dateText===month7
                        || dateText===month8)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month9)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val9 && daysCount<=val10):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6 || dateText===month7
                        || dateText===month8 || dateText===month9)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month10)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val10 && daysCount<=val11):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6 || dateText===month7
                        || dateText===month8 || dateText===month9 || dateText===month10)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month11)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val11 && daysCount<=val12):
                {
                    if(dateText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        let marLeft = (startTime*2.5)+mlval;
                        let ganttWidth = localdaysCount*2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,workTimeline);
                            }
                    }
                    else if(dateText===month2 || dateText===month3 || dateText===month4
                        || dateText===month5 || dateText===month6 || dateText===month7
                        || dateText===month8 || dateText===month9 || dateText===month10
                        || dateText===month11)
                    {
                        let ganttWidth = totWidth *2.5;
                        workTimeline[i].closest('.progress').style.display="block";
                        workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${ganttWidth}vw; height: ${hval}px;`;
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,workTimeline);
                            }
                    }
                    else if(dateText===month12)
                    {
                        remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i, hval, mlval);
                    }
                    else
                    {
                        workTimeline[i].closest('.progress').style.display="none";
                    }
                    break;  
                }    
            }
            break;
        }
        case 'Month': {
            let Mname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${workMonYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${workMonYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${workMonYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${workMonYear}`.toLowerCase();
            let monthText5 = `${Mname[4].innerText} ${workMonYear}`.toLowerCase();
            let monthText6 = `${Mname[5].innerText} ${workMonYear}`.toLowerCase();
            let monthText7 = `${Mname[6].innerText} ${workMonYear}`.toLowerCase();
            let monthText8 = `${Mname[7].innerText} ${workMonYear}`.toLowerCase();
            let monthText9 = `${Mname[8].innerText} ${workMonYear}`.toLowerCase();
            let monthText10 = `${Mname[9].innerText} ${workMonYear}`.toLowerCase();
            let monthText11 = `${Mname[10].innerText} ${workMonYear}`.toLowerCase();
            let monthText12 = `${Mname[11].innerText} ${workMonYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1 || monthText2 === month1 || monthText3 === month1 || monthText4 === month1 ||
                        monthText5 === month1 || monthText6 === month1 || monthText7 === month1 || monthText8 === month1 ||
                        monthText9 === month1 || monthText10 === month1 || monthText11 === month1 || monthText12 === month1) {
                        workTimeline[i].closest('.progress').style.display = "block";
                        getWorkPCoorrds(i, hval, endTimeline, minusVal, workTimeline, taskEndYear, taskStartInd, taskEndInd, Mname);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, workTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1, quarterText2, quarterText3, quarterText4, quarterText5, quarterText6,
                quarterText7, quarterText8, quarterText9, quarterText10, quarterText11, quarterText12;
            const qArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${workQuaYear}`;
                quarterText2 = `february ${workQuaYear}`;
                quarterText3 = `march ${workQuaYear}`;
                quarterText4 = `april ${workQuaYear}`;
                quarterText5 = `may ${workQuaYear}`;
                quarterText6 = `june ${workQuaYear}`;
                quarterText7 = `july ${workQuaYear}`;
                quarterText8 = `august ${workQuaYear}`;
                quarterText9 = `september ${workQuaYear}`;
                quarterText10 = `october ${workQuaYear}`;
                quarterText11 = `november ${workQuaYear}`;
                quarterText12 = `december ${workQuaYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1 || quarterText2 === month1 || quarterText3 === month1 || quarterText4 === month1 ||
                        quarterText5 === month1 || quarterText6 === month1 || quarterText7 === month1 || quarterText8 === month1 ||
                        quarterText9 === month1 || quarterText10 === month1 || quarterText11 === month1 || quarterText12 === month1) {
                        workTimeline[i].closest('.progress').style.display = "block";
                        getWorkPCoorrds(i, hval, endTimeline, minusVal, workTimeline, taskEndYear, taskStartInd, taskEndInd, qArrName);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, workTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = workTimeline[i].closest('.tablecal').querySelectorAll('.table tr th.VYear p');
            let year1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let yearText1, yearText2, yearText3, yearText4, yearText5, yearText6,
                yearText7, yearText8, yearText9, yearText10, yearText11, yearText12;
            const yArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (year1 === 'JAN-JUN') {
                yearText1 = `january ${workYearlyYear}`;
                yearText2 = `february ${workYearlyYear}`;
                yearText3 = `march ${workYearlyYear}`;
                yearText4 = `april ${workYearlyYear}`;
                yearText5 = `may ${workYearlyYear}`;
                yearText6 = `june ${workYearlyYear}`;
                yearText7 = `july ${workYearlyYear}`;
                yearText8 = `august ${workYearlyYear}`;
                yearText9 = `september ${workYearlyYear}`;
                yearText10 = `october ${workYearlyYear}`;
                yearText11 = `november ${workYearlyYear}`;
                yearText12 = `december ${workYearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (yearText1 === month1 || yearText2 === month1 || yearText3 === month1 || yearText4 === month1 ||
                        yearText5 === month1 || yearText6 === month1 || yearText7 === month1 || yearText8 === month1 ||
                        yearText9 === month1 || yearText10 === month1 || yearText11 === month1 || yearText12 === month1) {
                        workTimeline[i].closest('.progress').style.display = "block";
                        getWorkPCoorrds(i, hval, endTimeline, minusVal, workTimeline, taskEndYear, taskStartInd, taskEndInd, yArrName);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, workTimeline);
                        }
                    } else {
                        workTimeline[i].closest('.progress').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function getWorkAppearYear()
{
    let monthAppear = workYearText[2].innerText;
    return monthAppear;
}

function checkWorkPrevYear(appearYear,projEndYear,projStartYear,i,workTimeline)
{
    let booleanYear = true;
    if( appearYear > projEndYear || appearYear < projStartYear )
    {
        workTimeline[i].closest('.progress').style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}

function checkWorkProjPrevYear(appearYear,projEndYear,projStartYear)
{
    let booleanYear = true;
    if(appearYear > projEndYear || appearYear < projStartYear)
    {
        // workTimeline[i].style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}

function checkWorkTargetDate2(date2,i,daysCount,year2,year1)
{
    if(year2>year1)
    {
        let currentDate= new Date(`${year2}/01/01`);
        let a = Math.floor(date2.getTime()/(3600*24*1000));
        let b = Math.floor(currentDate.getTime()/(3600*24*1000));
        daysCount = a - b;
        if(daysCount>365)
        {
            return daysCount=365;
        }
        else
        {
            return daysCount;
        } 
    }
    else
    {
        return daysCount;
    }
}

function vtHeightAdd(vt,workTimeline,i)
{
    let tableprog =  workTimeline[i].closest('.tableprogian');
    let tablepro =  workTimeline[i].closest('.tablepro');
    let allTask = tableprog.querySelectorAll('.resource .taskList .progress');
    let currTask = tablepro.querySelectorAll('.progress');
    let mulnum = allTask.length - currTask.length;
    let ogHt = (80*mulnum) + 84;
    let minHt = vt.length * 20;
    tablepro.style.top=`${ogHt - minHt}px`;
} 

function getWorkCommonWidth(projEndYear, endMonInd, endNum, VDname) {
    let endMonName = month[+endMonInd - 1].toUpperCase();
    endMonName = `${endMonName} ${projEndYear}`;
    switch (selectInput2) {
        case 'Month':
        case 'Quarter':
        case 'Year': {
            switch (true) {
                case (VDname[0].innerText === "JANUARY"):
                case (VDname[0].innerText === 'Q1'):
                case (VDname[0].innerText === 'JAN-JUN'): {
                    if (endMonName === `JANUARY ${workYearText[2].innerText}`) {
                        return endNum * (6.575 / 31);
                    } else if (endMonName === `FEBRUARY ${workYearText[2].innerText}`) {
                        return 6.575 + (endNum * (13.15 / 28));
                    } else if (endMonName === `MARCH ${workYearText[2].innerText}`) {
                        return 13.15 + (endNum * (13.15 / 31));
                    } else if (endMonName === `APRIL ${workYearText[2].innerText}`) {
                        return 19.725 + (endNum * (13.15 / 30));
                    } else if (endMonName === `MAY ${workYearText[2].innerText}`) {
                        return 26.3 + (endNum * (13.15 / 31));
                    } else if (endMonName === `JUNE ${workYearText[2].innerText}`) {
                        return 32.875 + (endNum * (13.15 / 30));
                    } else if (endMonName === `JULY ${workYearText[2].innerText}`) {
                        return 39.45 + (endNum * (13.15 / 31));
                    } else if (endMonName === `AUGUST ${workYearText[2].innerText}`) {
                        return 46.025 + (endNum * (13.15 / 31));
                    } else if (endMonName === `SEPTEMBER ${workYearText[2].innerText}`) {
                        return 52.6 + (endNum * (13.15 / 30));
                    } else if (endMonName === `OCTOBER ${workYearText[2].innerText}`) {
                        return 59.175 + (endNum * (13.15 / 31));
                    } else if (endMonName === `NOVEMBER ${workYearText[2].innerText}`) {
                        return 65.575 + (endNum * (13.15 / 30));
                    } else if (endMonName === `DECEMBER ${workYearText[2].innerText}`) {
                        return 72.325 + (endNum * (13.15 / 31));
                    } else {
                        return 78.9;
                    }
                }
                default: {
                    break;
                }
            }
            break;
        }
    }
}

function getWorkPCoorrds(i, hval, endNum, minusNum, workTimeline, projEndYear, startMonInd, endMonInd, VDname) {
    let startMonthName = month[+startMonInd].toUpperCase();
    let endMonthName = month[+endMonInd - 1].toUpperCase();
    let endMonthYear = `${endMonthName} ${projEndYear}`;
    let factor1 = getWorkFactor1(endMonthName);
    getWorkCommonCoords(VDname, startMonthName, endMonthYear, endNum, minusNum, i, factor1, workTimeline, hval);
}

function getWorkFactor1(endMonthName) {
    if (selectInput2 === 'Month' || selectInput2 === 'Quarter' || selectInput2 === 'Year') {
        if (endMonthName === 'JANUARY') {
            return 6.575 / 31;
        } else if (endMonthName === 'FEBRUARY') {
            return 6.575 / 28;
        } else if (endMonthName === 'MARCH') {
            return 6.575 / 31;
        } else if (endMonthName === 'APRIL') {
            return 6.575 / 30;
        } else if (endMonthName === 'MAY') {
            return 6.575 / 31;
        } else if (endMonthName === 'JUNE') {
            return 6.575 / 30;
        } else if (endMonthName === 'JULY') {
            return 6.575 / 31;
        } else if (endMonthName === 'AUGUST') {
            return 6.575 / 31;
        } else if (endMonthName === 'SEPTEMBER') {
            return 6.575 / 30;
        } else if (endMonthName === 'OCTOBER') {
            return 6.575 / 31;
        } else if (endMonthName === 'NOVEMBER') {
            return 6.575 / 30;
        } else if (endMonthName === 'DECEMBER') {
            return 6.575 / 31;
        }
    }
}

function getWorkCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, i, factor1, workTimeline, hval) {
    switch (selectInput2) {
        case 'Month':
        case 'Quarter':
        case 'Year': {
            if ((VDname[0] === 'Q1' && startMonthName === 'JANUARY') || VDname[0].innerText === startMonthName) {
                if (endMonthName === `JANUARY ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `FEBRUARY ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MARCH ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `APRIL ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MAY ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 46.025;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 52.6;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 59.175;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 65.575;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 72.325;
                    let fval2 = 0;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 72.325;
                    let fval2 = 0;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'FEBRUARY') || VDname[1].innerText === startMonthName) {
                if (endMonthName === `FEBRUARY ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MARCH ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `APRIL ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MAY ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 46.025;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 52.6;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 59.175;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 65.75;
                    let fval2 = 6.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 65.75;
                    let fval2 = 6.575;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'MARCH') || VDname[2].innerText === startMonthName) {
                if (endMonthName === `MARCH ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `APRIL ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MAY ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 32.875;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 46.025;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 52.6;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 59.175;
                    let fval2 = 13.15;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 59.175;
                    let fval2 = 13.15;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'APRIL') || VDname[3].innerText === startMonthName) {
                if (endMonthName === `APRIL ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `MAY ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 46.025;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 52.6;
                    let fval2 = 19.725;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 52.6;
                    let fval2 = 19.725;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'MAY') || VDname[4].innerText === startMonthName) {
                if (endMonthName === `MAY ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 46.025;
                    let fval2 = 26.3;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 46.025;
                    let fval2 = 26.3;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'JUNE') || VDname[5].innerText === startMonthName) {
                if (endMonthName === `JUNE ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 39.45;
                    let fval2 = 32.878;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 39.45;
                    let fval2 = 32.878;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'JULY') || VDname[6].innerText === startMonthName) {
                if (endMonthName === `JULY ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 32.878;
                    let fval2 = 39.45;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 32.878;
                    let fval2 = 39.45;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'AUGUST') || VDname[7].innerText === startMonthName) {
                if (endMonthName === `AUGUST ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 46.025;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 46.025;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 46.025;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 46.025;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 26.3;
                    let fval2 = 46.025;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 26.3;
                    let fval2 = 46.025;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'SEPTEMBER') || VDname[8].innerText === startMonthName) {
                if (endMonthName === `SEPTEMBER ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 52.6;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 52.6;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 52.6;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 19.725;
                    let fval2 = 52.6;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 19.725;
                    let fval2 = 52.6;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'OCTOBER') || VDname[9].innerText === startMonthName) {
                if (endMonthName === `OCTOBER ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 59.175;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 59.175;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 13.15;
                    let fval2 = 59.175;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 13.15;
                    let fval2 = 59.175;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'NOVEMBER') || VDname[10].innerText === startMonthName) {
                if (endMonthName === `NOVEMBER ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 65.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 6.575;
                    let fval2 = 65.575;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 6.575;
                    let fval2 = 65.575;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'DECEMBER') || VDname[11].innerText === startMonthName) {
                if (endMonthName === `DECEMBER ${workYearText[2].innerText}`) {
                    let fval = 0;
                    let fval2 = 72.325;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                } else {
                    let fval = 0;
                    let fval2 = 72.325;
                    endNum = 31;
                    setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval);
                }
                break;
            }
            break;
        }
    }
}

function setRemWidth2(minusNum, endNum, i, fval, fval2, factor1, workTimeline, hval) {
    UniMarLeft2 = (minusNum * factor1) + (10.145 + fval2);
    UniRemWidth2 = `${Math.abs((fval - (minusNum * factor1)) + (endNum * factor1))}`;
    UniRemWidth2 = +UniRemWidth2 + 0.2;
    workTimeline[i].style.cssText = `margin-left:${UniMarLeft2}vw; width:${(UniRemWidth2).toFixed(5)}vw; height: ${hval}px`;
}

function remainWorkDaysCount(endTimeline,workTimeline,mobileWidth,i,hval,mlval)
{        
    workTimeline[i].closest('.progress').style.display="block";
    workTimeline[i].style.cssText=`margin-left:${mlval}vw; width:${endTimeline * 2.5}vw; height:${hval}px; display: block;`;
    if(mobileWidth<700)
    {
        showinMobile3(i,endTimeline,workTimeline);
    }  
}

function remainWorkDaysCount2(endTimeline,workTimeline,mobileWidth,hval,mlval)
{        
    workTimeline.closest('.progress').style.display="block";
    workTimeline.style.cssText=`margin-left:${mlval}vw; width:${endTimeline * 2.5}vw; height:${hval}px; display: block;`;
    if(mobileWidth<700)
    {
        showinMobile3(i,endTimeline,workTimeline);
    }  
}

function adjustHeight(employee,j,i)
{
    let imgdiv = employee[j].querySelector('.img_emp');
    let tr = employee[j].closest('#benefitsdrop').querySelectorAll('table tbody .virtualtr');
    if(i>0)
    {
        fixedHeight += 30;
        imgdiv.style.height = `${fixedHeight}px`;
        tr[j].style.height = `${fixedHeight}px`;
    }
}

function giveWorkbackground(i,j,workTimeline)
{
    workTimeline[i].style.backgroundColor=`${WorkProject[j].employee[i].statusclass}`;
    i++;
    dropProjTip = workload.querySelectorAll('#benefitsdrop .employee .projTimeline .progress-bar');
    for(let ind=0; ind<dropProjTip.length; ind++)
    {
        ['mouseover','mouseout'].forEach((e)=>
        {
            dropProjTip[ind].addEventListener(e, showDropProjTip);
        })
    }
}

function giveWorkTaskbG(i,j,k,workTimeline)
{
    workTimeline[i].style.backgroundColor=`${WorkProject[k].employee[j].task[i].statusclass}`;
    dropTaskTip = workload.querySelectorAll('#benefitsdrop .taskProj .progress-bar');
    for(let ind=0; ind<dropTaskTip.length; ind++)
    {
        ['mouseover','mouseout'].forEach((e)=>
        {
            dropTaskTip[ind].tipind = ind;
            dropTaskTip[ind].addEventListener(e, showDropTaskTip);
        })
    }
}

function giveResTaskbG(i,j,k,workTimeline)
{
    workTimeline[i].style.backgroundColor=`${WorkResource[k].project[j].task[i].statusclass}`;
}

function checkAllTask(projTask,i)
{
    let taskAll = projTask[i].closest('.taskList').querySelectorAll('.progress');
    let text = projTask[i].closest('.taskList').querySelector('.textdiv');
    Array.from(taskAll).every((task)=>
    {
        if(task.style.display=="none")
        {
            text.style.display="none";
        }
    })

    Array.from(taskAll).some((task)=>
    {
        if(task.style.display=="block")
        {
            text.style.display="block";
        }
    })
}

// making tooltip
function makingEmpTooltip()
{
    hoverEmpName.forEach((hover)=>
    {
        let p = hover.innerHTML;
        getHoverEmpName(p, hover);
    })
}

function makingEmpTooltip2()
{
    hoverEmpName2.forEach((hover)=>
    {
        let p = hover.innerHTML;
        getHoverEmpName(p, hover);
    })
}

function getHoverEmpName(p, hover)
{
    if(p.length>12)
    {
        hover.setAttribute('data-bs-toggle','tooltip');
        hover.setAttribute('data-bs-placement','bottom');
        hover.setAttribute('title',`${p}`);
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
}

// Tooltip appear

function showDropTaskTip(e)
{
    if(e.type==="mouseover")
    {
       let empInd = e.target.getAttribute('empInd');
       let taskInd = e.target.getAttribute('taskInd');
       let tip = e.target.closest('#benefitsdrop').querySelector('.tasktooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top - 330}px; left:${left - 250}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let startDate = WorkProject[projInd].employee[empInd].task[taskInd].pstartdate.substr(8,2);
       let startMonName = WorkProject[projInd].employee[empInd].task[taskInd].planned.substr(0,3);
       let startYear = WorkProject[projInd].employee[empInd].task[taskInd].pstartdate.substr(0,4);
       let endDate = WorkProject[projInd].employee[empInd].task[taskInd].penddate.substr(8,2);
       let endMonName = WorkProject[projInd].employee[empInd].task[taskInd].planned.substr(9,3);
       let endYear = WorkProject[projInd].employee[empInd].task[taskInd].penddate.substr(0,4);
       let taskName = WorkProject[projInd].employee[empInd].task[taskInd].taskname;
       h4.innerText=`${taskName}: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
       p1.innerText=`Status: ${WorkProject[projInd].employee[empInd].task[taskInd].priority}`;
       p2.innerText=`Owner Name: ${WorkProject[projInd].employee[empInd].task[taskInd].ownername}`;
       p3.innerText=`Percentage Done: ${WorkProject[projInd].employee[empInd].task[taskInd].taskpercentage}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('#benefitsdrop').querySelector('.tasktooltip');
        tip.style.display="none";
    }
}

function showDropResTaskTip(e)
{
    if(e.type==="mouseover")
    {
       let empInd = e.target.getAttribute('empInd');
       let taskInd = e.target.getAttribute('taskInd');
       let tip = e.target.closest('#benefits').querySelector('.tasktooltip');
       let top = e.clientY;
       let left = e.clientX;
       tip.style.cssText=`top:${top - 200}px; left:${left - 250}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let startDate = WorkResource[resInd].project[empInd].task[taskInd].pstartdate.substr(8,2);
       let startMonName = WorkResource[resInd].project[empInd].task[taskInd].planned.substr(0,3);
       let startYear = WorkResource[resInd].project[empInd].task[taskInd].pstartdate.substr(0,4);
       let endDate = WorkResource[resInd].project[empInd].task[taskInd].penddate.substr(8,2);
       let endMonName = WorkResource[resInd].project[empInd].task[taskInd].planned.substr(9,3);
       let endYear = WorkResource[resInd].project[empInd].task[taskInd].penddate.substr(0,4);
       let taskName = WorkResource[resInd].project[empInd].task[taskInd].taskname;
       h4.innerText=`${taskName}: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
       p1.innerText=`Status: ${WorkProject[projInd].employee[empInd].task[taskInd].priority}`;
       p2.innerText=`Owner Name: ${WorkProject[projInd].employee[empInd].task[taskInd].ownername}`;
       p3.innerText=`Percentage Done: ${WorkProject[projInd].employee[empInd].task[taskInd].taskpercentage}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('#benefits').querySelector('.tasktooltip');
        tip.style.display="none";
    }
}