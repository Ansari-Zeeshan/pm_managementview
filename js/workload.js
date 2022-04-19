
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
const monthData = workload.querySelector('#benefitsdrop th select');
const monthData2 = workload.querySelector('#benefits th select');
let workYear = 2021, workMonNum = 1, workMonNum2 = 0, workMonCount = 0, fixedHeight = 30, combinedVal = [], dateVal = [],
monthVal = [], yearVal = [];
let workMonText, workYearText, projName, dropProjTip, dropTaskTip, hoverEmpName, projInd, resInd, resName, resTip;
let preventFun = {};
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
//     task.push(alltask);
//     WorkProjTip.push(task);
//     console.log(WorkProjTip);   
// }
monthData.addEventListener('change', (e) => {
    let monthInput = monthData.options[monthData.selectedIndex].value;
    let num = +getNumericMonth(monthInput);
    workMonNum2 = num;
    workMonCount = num;
    num = num+1;
    workYear = e.target.closest('th').querySelector('p').innerText; 
    workMonNum = num;
    getWorkMonLength();
    assignWorkDate();
    calWorkTaskProjBar(projInd);
})
monthData2.addEventListener('change', (e) => {
    let monthInput = monthData2.options[monthData2.selectedIndex].value;
    let num = +getNumericMonth(monthInput);
    workMonNum2 = num;
    workMonCount = num;
    num = num+1;
    workYear = e.target.closest('th').querySelector('p').innerText; 
    workMonNum = num;
    getWorkMonLength();
    assignWorkDate();
    calWorkTaskResBar(resInd);
})
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
        let workYearText = workShowTable[j].closest('table').querySelector('.thspace p');
        workMonText.innerText=`${month[workMonCount]}`;
        workYearText.innerText=`${workYear}`;
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
        let proname = WorkResource[i].project[j].projectname.replace(/\s+/g, "");
        j === WorkResource[i].project.length - 1 ? tr.setAttribute('class',`borderdot virtualtr ${proname}`) : tr.setAttribute('class',`virtualtr ${proname}`);       
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
            task_bar.innerText = `${WorkResource[i].project[j].task[k].taskname}`;
            task_bar.setAttribute('class','task1');
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
    let dropResTaskTip = workload.querySelectorAll('#benefits .taskList .progress .task1');
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
            for(let trind=0; trind<insideTask.length - 1; trind++)
            {
                let tr = document.createElement('tr');
                tr.setAttribute('class',`virtualtr ${text.replace(/\s+/g, "")}`);
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
            let projStartInd = WorkProject[k].employee[j].task[i].pstartdate.substr(5, 2);
            let projStartMon = month[--projStartInd].substr(0, 3);
            let getMonthIndex = getNumericMonth(projStartMon);
            let startYear = WorkProject[k].employee[j].task[i].pstartdate.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            let monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = WorkProject[k].employee[j].task[i].penddate.substr(8,2);
            let mileEndYear = WorkProject[k].employee[j].task[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = WorkProject[k].employee[j].task[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            let prevYear = checkWorkPrevYear(appearYear, mileEndYear, mileStartYear, i, projTask);
            let mileStartDate = WorkProject[k].employee[j].task[i].pstartdate.substr(8,2);
            let startMText = projStartMon;
            let minusVal = +mileStartDate;
            hval = 10;
            mlval = 10.15;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        console.log(projTask[i]);
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,mileStartDate);
                        showWorkload(daysCount,endTimeline,i,projTask,mobileWidth,hval,mlval);
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
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval);
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
        let projTask = resource[j].querySelectorAll('.taskList .progress .task1');
        let proname = WorkResource[k].project[j].projectname;
        let extratr = workTable2.querySelectorAll(`.${proname.replace(/\s+/g, "")}`);
        for(let i=0; i<projTask.length; i++)
        {
            let date1 = new Date(WorkResource[k].project[j].task[i].pstartdate.substr(0,10).toString());
            let date2 = new Date(WorkResource[k].project[j].task[i].penddate.substr(0,10).toString());
            let projStartInd = WorkResource[k].project[j].task[i].pstartdate.substr(5, 2);
            let projStartMon = month[--projStartInd].substr(0, 3);
            let getMonthIndex = getNumericMonth(projStartMon);
            let startYear = WorkResource[k].project[j].task[i].pstartdate.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            monthAppear = getWorkAppearYear();
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
            hval = 38;
            mlval = 10.24;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,mileStartDate);
                        showWorkload(daysCount,endTimeline,i,projTask,mobileWidth,hval,mlval,extratr,j);
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
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,hval,mlval,extratr,j);
                        daysCount = endDate-startDate;
                    }
                }
            }
            giveResTaskbG(i,j,k,projTask);
        }
    }
    makingEmpTooltip2();
}

function showWorkload(daysCount,endTimeline,i,workTimeline,mobileWidth,hval,mlval,extratr,j)
{
    let totWidth = workTimeline[i].closest('.tablecal').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;

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
}
function showAlterWorkload(daysCount,endTimeline,i,workTimeline,startTime,startMText,minusVal,mobileWidth,hval,mlval,extratr,j)        
{
    startTime = +startTime -1;
    let totWidth = workTimeline[i].closest('.tablecal').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;
    updateValue(startMText,minusVal);
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
}

function getWorkAppearYear()
{
    let monthAppear = workYearText[2].innerText;
    return monthAppear;
}

function checkWorkPrevYear(appearYear,projEndYear,projStartYear,i,ganttTimeline)
{
    let booleanYear = true;
    if( appearYear > projEndYear || appearYear < projStartYear )
    {
        ganttTimeline[i].closest('.progress').style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}

function checkWorkProjPrevYear(appearYear,projEndYear,projStartYear,i,ganttTimeline)
{
    let booleanYear = true;
    if(appearYear > projEndYear || appearYear < projStartYear)
    {
        // ganttTimeline[i].style.display="none";
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

// function showExtratr(extratr,i,j)
// {
//     extratr[i].style.display="revert";
//     if(j>=1)
//     {
//         if(workTimeline[i].classList.contains('vtadd'))
//         {
//             let tableprog =  workTimeline[i].closest('.tableprogian');
//             let tablepro =  workTimeline[i].closest('.tablepro');
//             let allTask = tableprog.querySelectorAll('.resource .taskList .progress');
//             let currTask = tablepro.querySelectorAll('.progress');
//             let mulnum = allTask.length - currTask.length;
//             workTimeline[i].classList.remove('vtadd');
//             let progress = workTimeline[i].closest('.taskList').querySelectorAll('.progress');
//             let vt = Array.from(progress).filter((prog)=>
//             {
//                 if(!prog.classList.contains('vtadd'))
//                 {
//                     return prog;
//                 }
//             })
//             let ogHt = (80*mulnum) + 84;
//             let minHt = vt.length * 20;
//             tablepro.style.top=`${ogHt + minHt}px`;
//         }
//     }
// }
// function hideExtratr(extratr,i,workTimeline,j)
// {
//     extratr[i].style.display="none";
//     if(j>=1)
//     {
//         workTimeline[i].classList.add('class','vtadd');
//         let vt = workTimeline[i].closest('.taskList').querySelectorAll('.vtadd');
//         vtHeightAdd(vt,workTimeline,i);
//     }
// }

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
    if(p.length>16)
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
       let taskDataInd = this.tipind;
       let tip = e.target.closest('#benefitsdrop').querySelector('.tasktooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top - 330}px; left:${left - 250}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let startDate = WorkProjTip[projInd].task[taskDataInd].pstartdate.substr(8,2);
       let startMonName = WorkProjTip[projInd].task[taskDataInd].planned.substr(0,3);
       let startYear = WorkProjTip[projInd].task[taskDataInd].pstartdate.substr(0,4);
       let endDate = WorkProjTip[projInd].task[taskDataInd].penddate.substr(8,2);
       let endMonName = WorkProjTip[projInd].task[taskDataInd].planned.substr(9,3);
       let endYear = WorkProjTip[projInd].task[taskDataInd].penddate.substr(0,4);
       let taskName = WorkProjTip[projInd].task[taskDataInd].taskname;
       h4.innerText=`${taskName}: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
       p1.innerText=`Duration: ${WorkProjTip[projInd].task[taskDataInd].duration}`;
       p2.innerText=`Percentage Done: ${WorkProjTip[projInd].task[taskDataInd].percentage}`;
       p3.innerText=`Status: ${WorkProjTip[projInd].task[taskDataInd].statustext}`;
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
       let taskDataInd = this.tipind;
       let tip = e.target.closest('#benefits').querySelector('.tasktooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top - 200}px; left:${left - 250}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let startDate = WorkResTip[resInd].task[taskDataInd].pstartdate.substr(8,2);
       let startMonName = WorkResTip[resInd].task[taskDataInd].planned.substr(0,3);
       let startYear = WorkResTip[resInd].task[taskDataInd].pstartdate.substr(0,4);
       let endDate = WorkResTip[resInd].task[taskDataInd].penddate.substr(8,2);
       let endMonName = WorkResTip[resInd].task[taskDataInd].planned.substr(9,3);
       let endYear = WorkResTip[resInd].task[taskDataInd].penddate.substr(0,4);
       let taskName = WorkResTip[resInd].task[taskDataInd].taskname;
       h4.innerText=`${taskName}: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
       p1.innerText=`Duration: ${WorkResTip[resInd].task[taskDataInd].duration}`;
       p2.innerText=`Percentage Done: ${WorkResTip[resInd].task[taskDataInd].percentage}`;
       p3.innerText=`Status: ${WorkResTip[resInd].task[taskDataInd].statustext}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('#benefits').querySelector('.tasktooltip');
        tip.style.display="none";
    }
}