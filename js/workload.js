
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
let workYear = 2021, workMonNum = 1, workMonNum2 = 0, workMonCount = 0, fixedHeight = 30, combinedVal = [], dateVal = [],
monthVal = [], yearVal = [];
let workMonText, workYearText, projName, dropProjTip, dropTaskTip, hoverEmpName, projInd, projInd2, resName;

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
        for(let i=2; i<workMonLen+2; i++)
        {
            let dayName = new Date(workYear, workMonNum2, i - 1).toString().substr(0,3);
            workShowDate[i].classList.add('dateVirtual');
            workShowDate[i].innerHTML=`${dayName} <p>${i - 1}</p>`;
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
    calWorkProjBar(projInd)
    calWorkTaskjProjBar(projInd);
})
prevWork.addEventListener('click',()=>
{
    workMonCount--;
    workMonNum--;
    workMonNum2--;
    if(workMonCount<0 && workYear>2021)
    {
        workMonCount=11;
        workYear--;
        workMonNum=12;
        workMonNum2=11;
    }
    else if(workMonCount<0 && workYear == 2021)
    {
        workMonCount=0;
        workMonNum=1;
        workMonNum2=0;
        return false;
    }
    getWorkMonLength();
    assignWorkDate();
    calWorkProjBar(projInd);
    calWorkTaskjProjBar(projInd);
})

workProjOpt.forEach((proj, ind) => {
    proj.addEventListener('click',(e)=>
    {
       projInd = ind;
       let projMonth = +WorkProject[ind].pstartdate.substr(5,2);
       let projYear = +WorkProject[ind].pstartdate.substr(0,4);
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
       calWorkProjBar(ind);
       calWorkTaskjProjBar(ind);
    })
});

workResOpt.forEach((proj, ind) => {
    proj.addEventListener('click',(e)=>
    {
       projInd2 = ind;
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
       createWorkTaskRes(ind);
    })
});

function createWorkRes(empname,i)
{
    empname.innerText = WorkResource[i].employeename;
    for(let j=0; j<WorkResource[i].name.length; j++)
    {
        let res = document.createElement('div');
        res.setAttribute('class','resource'); 
        let tr = document.createElement('tr');
        j === WorkResource[i].name.length - 1 ? tr.setAttribute('class',`borderdot virtualtr`) : tr.setAttribute('class',`virtualtr`);       
        tr.innerHTML=`
                    <td class="text-center dot"> 
                        <div></div><span>${WorkResource[i].name[j].projectname}</span>
                    </td>
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
        res.innerHTML=`
        ${
            (()=>
            {
                if(j ===0)
                {
                    return `<div class="tablepro" style="top: ${89*(j+1)}px">`;
                }
                else
                {
                    return `<div class="tablepro">`;
                }
            })()
        }
            <div class="progress resTimeline">
                <div class="progress-bar"></div>
            </div>
            <div class="taskList">
            </div>
        </div>  
        `;
        workTab2tr.append(tr);
        workTab2Append.insertBefore(res, workTab2Append.children[j]);
    }
    resName = workload.querySelectorAll('#benefits .resource');
}

function createWorkTaskRes(i)
{
    for(let j=0; j<WorkResource[i].name.length; j++)
    {
        let text = WorkResource[i].name[j].projectname;
        let taskAppend = resName[j].querySelector('.taskList');
        for(let k=0; k<WorkResource[i].name[j].project.length; k++)
        {
            let progress = document.createElement('div');
            progress.setAttribute('class','progress');
            let task_bar = document.createElement('div');
            task_bar.innerText = "Task 01";
            task_bar.setAttribute('class','task1');
            progress.appendChild(task_bar);
            taskAppend.appendChild(progress);
            let insideTask = taskAppend.querySelectorAll('.progress');
            if(insideTask.length>=2)
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
                        for(let trind=0; trind< insideTask.length - 1; trind++)
                        {
                            let tr = document.createElement('tr');
                            tr.setAttribute('class','virtualtr');
                            tr.innerHTML=`
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
                            <td></td>
                            `;
                            tbody.insertBefore(tr, tbody.children[index + 1]);
                        }
                    }
                })
            }
            if(j>=1)
            {
                let tableprog =  taskAppend.closest('.tableprogian');
                let tablepro =  taskAppend.closest('.tablepro');
                let allTask = tableprog.querySelectorAll('.resource .taskList .progress');
                let currTask = taskAppend.querySelectorAll('.progress');
                let mulnum = allTask.length - currTask.length;
                tablepro.style.top = `${82*(mulnum)+89}px`;
            }
        }
    }
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
                    <div class="progress projTimeline">
                        <div class="progress-bar"></div>
                        <div class="whiteprog-bar"></div>
                        <div class="redprog-bar"></div>
                    </div>
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
                    <td class="fixedvw text-center"></td>
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

function calWorkProjBar(j)
{
    let mobileWidth = body.clientWidth;
    let projTimeline = projName.querySelectorAll('.tableproben .projTimeline .progress-bar');
    for(let i=0; i<WorkProject[j].employee.length; i++)
    {
        let date1 = new Date(WorkProject[j].employee[i].pstartdate.substr(0,10).toString());
        let date2 = new Date(WorkProject[j].employee[i].penddate.substr(0,10).toString());
        let projStartInd = +WorkProject[j].employee[i].pstartdate.substr(5, 2);
        let projStartMon = month[--projStartInd].substr(0, 3);
        let getMonthIndex = getNumericMonth(projStartMon);
        let startYear = WorkProject[j].employee[i].pstartdate.substr(0,4);
        compareYear = +startYear;
        let startDate = Math.floor(date1.getTime()/(3600*24*1000));
        let endDate = Math.floor(date2.getTime()/(3600*24*1000));
        let daysCount = endDate-startDate;
        monthAppear = getWorkAppearYear();
        let appearYear = +monthAppear;
        let compareDate = new Date(`${appearYear}/01/01`);
        let endTimeline = WorkProject[j].employee[i].penddate.substr(8,2);
        let projEndYear = WorkProject[j].employee[i].penddate.substr(0,4);
        endTimeline = getTimeline(endTimeline, appearYear, projEndYear);
        endTimeline = +endTimeline;
        let projStartYear = WorkProject[j].employee[i].pstartdate.substr(0,4);
        getMonthName(getMonthIndex, appearYear, projStartYear);
        prevYear = checkWorkPrevYear(appearYear, projEndYear, projStartYear, i, projTimeline);
        let projStartDate = WorkProject[j].employee[i].pstartdate.substr(8,2);
        let startMText = projStartMon;
        let minusVal = +projStartDate;
        if(date1.getTime()<=compareDate.getTime())
        {
            if(appearYear>=compareYear && prevYear)
            {
                if(month1===`January ${appearYear}`)
                {
                    daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,projStartYear);
                    showWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,mobileWidth);
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
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`February ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`March ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`April ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`May ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`June ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`July ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`August ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`September ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`October ${appearYear}`)
                {
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`November ${appearYear}`)
                {           
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
                else if(month1===`December ${appearYear}`)
                {                    
                    daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                    showAlterWorkload(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                    daysCount = endDate-startDate;
                }
            }
        }
        giveWorkbackground(i,j,projTimeline);
    }
}

function calWorkTaskjProjBar(k)
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
            monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = WorkProject[k].employee[j].task[i].penddate.substr(8,2);
            let mileEndYear = WorkProject[k].employee[j].task[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = WorkProject[k].employee[j].task[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            prevYear = checkWorkPrevYear(appearYear, mileEndYear, mileStartYear, i, projTask);
            let mileStartDate = WorkProject[k].employee[j].task[i].pstartdate.substr(8,2);
            let startMText = projStartMon;
            let minusVal = +mileStartDate;

            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,mileStartDate);
                        showWorkload(daysCount,endTimeline,i,projTask,mobileWidth,j,appearYear,mileEndYear);
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
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkload(daysCount,endTimeline,i,projTask,mileStartDate,startMText,minusVal,mobileWidth,j,appearYear,mileEndYear);
                        daysCount = endDate-startDate;
                    }
                }
            }
            adjustHeight(employee,j,i);
            giveWorkTaskbG(i,j,k,projTask);
        }
    }
    makingEmpTooltip();
    checkCollidePart();
    checkGapPart();
}

function showWorkload(daysCount,endTimeline,i,workTimeline,mobileWidth)
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                workTimeline[i].closest('.progress').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month2)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i); 
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month3)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month4)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month5)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month6)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month7)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month8)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month9)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month10)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month11)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month12)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);      
            }
            else 
            {
                workTimeline[i].closest('.progress').style.display="none";
            }
            break;  
        }    
    }               
}
function showAlterWorkload(daysCount,endTimeline,i,workTimeline,startTime,startMText,minusVal,mobileWidth)        
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = (daysCount +1) *2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2)
            {                
                workTimeline[i].style.cssText=`margin-left:10.21vw`;
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }  
            }
            else if(dateText===month2)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month3)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month4)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month5)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month6)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month7)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month8)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month9)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month10)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month11)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline[i].closest('.progress').style.display="block";
                workTimeline[i].style.cssText=`margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month12)
            {
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
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
    if(appearYear > projEndYear || appearYear < projStartYear)
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

function remainWorkDaysCount(endTimeline,workTimeline,mobileWidth,i)
{        
    workTimeline[i].closest('.progress').style.display="block";
    workTimeline[i].style.cssText=`margin-left:10.21vw; width:${endTimeline * 2.5}vw; height:10px; display: block;`;
    if(mobileWidth<700)
    {
        showinMobile3(i,endTimeline,workTimeline);
    }  
}

function remainWorkDaysCount2(endTimeline,workTimeline,mobileWidth)
{        
    workTimeline.closest('.progress').style.display="block";
    workTimeline.style.cssText=`margin-left:10.21vw; width:${endTimeline * 2.5}vw; height:10px; display: block;`;
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
    i++;
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

function checkCollidePart()
{
   let mobileWidth = body.clientWidth;
   let emp = projName.querySelectorAll('.employee');
   for(let i=0; i<emp.length; i++)
   {
       let redTimeline = emp[i].querySelector('.projTimeline .redprog-bar');
       let task = emp[i].querySelectorAll('.taskProj .progress-bar');
       let listDate=[], listOfDate;
       for(let j=0; j<task.length; j++)
       {
            let fulldate1 = WorkProject[projInd].employee[i].task[j].pstartdate.substr(0,10);
            let fulldate2 = WorkProject[projInd].employee[i].task[j].penddate.substr(0,10);
            let startMon = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(5,2);  
            let endMon = +WorkProject[projInd].employee[i].task[j].penddate.substr(5,2);  
            let startYear = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(0,4);
            listOfDate = rangeDate(`${fulldate1}`,`${fulldate2}`, listDate);
            // for(let k=start; k<=end; k++)
            // {
            //     combinedVal.push(k);
            // }
            dateVal.push(new Date(fulldate1), new Date(fulldate2));
            monthVal.push(startMon, endMon);
            yearVal.push(startMon, startYear);
        }
        let dupElement = [];
        dupElement = toFindDupElement(listOfDate);
        if(dupElement.length>0)
        {
            let collInd = findCollInd(dateVal);
            let monthInd = monthVal[collInd - 1];
            monthInd = monthInd - 1;
            let monname = month[monthInd].substr(0,3);
            let startTime = +dupElement[0].substr(8,2);
            let endTimeline = +dupElement[dupElement.length - 1].substr(8,2);
            let daysCount = +dupElement.length;
            let monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let collStartYear = yearVal[collInd];
            let collEndYear = yearVal[collInd+2];
            let date1 = new Date(`${collStartYear}-${monthInd}-${startTime}`);
            let date2 = new Date(`${collEndYear}-${monthInd}-${endTimeline}`);
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            endTimeline = getTimeline(endTimeline, appearYear, collEndYear);
            endTimeline = +endTimeline;
            getMonthName(monthInd, appearYear, collStartYear);
            prevYear = checkWorkProjPrevYear(appearYear, collEndYear, collStartYear, i, redTimeline);
            let minusVal = startTime;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=collStartYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,collStartYear);
                        showWorkCollload(daysCount,endTimeline,redTimeline,mobileWidth);
                        daysCount = endDate - startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=collStartYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
        }
        listDate = [];
        dateVal = [];
        monthVal = [];
        yearVal = [];
   }
}

function rangeDate(startDate, endDate, listDate)
{
    let currentDate = new Date(startDate);
    let date = startDate;
    while (currentDate <= new Date(endDate)) {
        // Use UTC date to prevent problems with time zones and DST
        date = currentDate.toISOString().slice(0,10);
        listDate.push(date);
        currentDate.setDate(currentDate.getDate()+1);
    }
    return listDate;
}

function toFindDupElement(array)
{
    const unique = new Set(array);
    const filteredElements = array.filter(item => {
        if (unique.has(item)) {
            unique.delete(item);
        } else {
            return item;
        }
    });
    return filteredElements;
}

function findCollInd(dateVal)
{
    for(let i=0; i<Math.ceil((dateVal.length/2)-1); i++)
    {
        if(i == 0)
        {
            if(dateVal[i+1].getTime()>=dateVal[i+2].getTime())
            {
                return i+1;
            }
        }
        else
        {
            if(dateVal[i+2].getTime()>=dateVal[i+3].getTime())
            {
                return i+2;
            }
        }
    }
}

function checkGapPart()
{
   let mobileWidth = body.clientWidth;
   let emp = projName.querySelectorAll('.employee');
   let dateVal2 = [], monthVal2 = [], yearVal2 = [], listDate = [], gapVal;
   for(let i=0; i<emp.length; i++)
   {
       let whiteTimeline = emp[i].querySelector('.projTimeline .whiteprog-bar');
       let task = emp[i].querySelectorAll('.taskProj .progress-bar');
       for(let j=0; j<task.length; j++)
       {
            let fulldate1 = WorkProject[projInd].employee[i].task[j].pstartdate.substr(0,10);
            let fulldate2 = WorkProject[projInd].employee[i].task[j].penddate.substr(0,10);
            let startMon = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(5,2);  
            let endMon = +WorkProject[projInd].employee[i].task[j].penddate.substr(5,2);  
            let startYear = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(0,4);  
            dateVal2.push(new Date(fulldate1), new Date(fulldate2));
            monthVal2.push(startMon, endMon);
            yearVal2.push(startMon, startYear);
        }
        let ind =  findGapInd(dateVal2);
        let compVal1 = dateVal2[ind];
        let compVal2 = dateVal2[ind+1];
        let diff  = Math.floor(compVal2.getTime()/(3600*24*1000)) - Math.floor(compVal1.getTime()/(3600*24*1000));
        if(diff>1)
        {
            gapVal = rangeDate(`${compVal1}`,`${compVal2}`, listDate);
            let monthInd = monthVal2[ind];
            monthInd = monthInd - 1;
            let monname = month[monthInd].substr(0,3);
            let startTime = +gapVal[0].substr(8,2) + 1;
            let endTimeline = +gapVal[gapVal.length - 1].substr(8,2);
            let daysCount = +gapVal.length -2;
            let monthAppear = getWorkAppearYear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let gapStartYear = yearVal2[ind];
            let gapEndYear = yearVal2[ind+2];
            let date1 = new Date(`${gapStartYear}-${monthInd}-${startTime}`);
            let date2 = new Date(`${gapEndYear}-${monthInd}-${endTimeline}`);
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            endTimeline = getTimeline(endTimeline, appearYear, gapEndYear);
            endTimeline = +endTimeline;
            getMonthName(monthInd, appearYear, gapStartYear);
            prevYear = checkWorkProjPrevYear(appearYear, gapEndYear, gapStartYear, i, whiteTimeline);
            let minusVal = startTime;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=gapStartYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,gapStartYear);
                        showWorkCollload(daysCount,endTimeline,whiteTimeline,mobileWidth);
                        daysCount = endDate - startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=gapStartYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,whiteTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
        }
        listDate = [];
        dateVal2 = [];
        monthVal2 = [];
        yearVal2 = [];
   }
}

function findGapInd(dateVal2)
{
    for(let i=0; i<Math.ceil((dateVal2.length/2) -1); i++)
    {
        if(i == 0)
        {
            if(dateVal2[i+1].getTime()<dateVal2[i+2].getTime())
            {
                return i+1;
            }
        }
        else
        {
            if(dateVal2[i+2].getTime()<dateVal2[i+3].getTime())
            {
                return i+2;
            }
        }
    }
}

function showWorkCollload(daysCount,endTimeline,workTimeline,mobileWidth)
{
    let totWidth = workTimeline.closest('table').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;
    
    switch(true){
        case (daysCount<=30):
        {
            if(dateText===month1)
            {
                let ganttWidth = daysCount * 2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth<700)
                    {
                        showinMobile1(i,daysCount,workTimeline);
                    }
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;
        }      
        case (daysCount>30 && daysCount<=58):
        {
            if(dateText===month1)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month2)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth); 
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>58 && daysCount<=89):
        {
            if(dateText===month1 || dateText===month2)
            {
                let ganttWidth = totWidth *2.5; 
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month3)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>89 && daysCount<=119):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month4)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>119 && daysCount<=150):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month5)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4 || dateText===month5)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month6)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>180 && daysCount<=211):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4 || dateText===month5 || dateText===month6)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month7)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
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
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month8)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
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
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month9)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
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
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month10)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
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
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month11)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
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
                workTimeline.style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month12)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);      
            }
            else 
            {
                workTimeline.style.display="none";
            }
            break;  
        }    
    }               
}
function showAlterWorkCollload(daysCount,endTimeline,workTimeline,startTime,startMText,minusVal,mobileWidth)        
{
    startTime = +startTime -1;
    let totWidth = workTimeline.closest('.tablecal1').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;
    updateValue(startMText,minusVal);
    switch(true)
    {
        case (daysCount<=val1):
        {
            if(dateText===month1)
            {
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = daysCount *2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,daysCount,workTimeline);               
                    }
            }        
            else
            {
                workTimeline.style.display="none";
            }
            break;
        }
        case (daysCount>val1 && daysCount<=val2):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2)
            {          
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val2 && daysCount<=val3):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }  
            }
            else if(dateText===month2)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month3)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val3 && daysCount<=val4):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month4)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val4 && daysCount<=val5):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(dateText===month5)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val5 && daysCount<=val6):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month6)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val6 && daysCount<=val7):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5 || dateText===month6)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month7)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val7 && daysCount<=val8):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5 || dateText===month6 || dateText===month7)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month8)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val8 && daysCount<=val9):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month9)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val9 && daysCount<=val10):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month10)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val10 && daysCount<=val11):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month11)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }
        case (daysCount>val11 && daysCount<=val12):
        {
            if(dateText===month1)
            {
                let localdaysCount=totWidth - startTime;
                let marLeft = (startTime*2.5)+10.21;
                let ganttWidth = localdaysCount*2.5;
                workTimeline.style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline.style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,workTimeline);
                    }
            }
            else if(dateText===month12)
            {
                remainWorkDaysCount2(endTimeline, workTimeline, mobileWidth);
            }
            else
            {
                workTimeline.style.display="none";
            }
            break;  
        }    
    }
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

function getHoverEmpName(p, hover)
{
    if(p.length>10)
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
function showDropProjTip(e)
{
    if(e.type==="mouseover")
    {
       let tip = e.target.closest('#benefitsdrop').querySelector('.timelinetooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top - 370}px; left:${left -250}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let p4 = tip.querySelector('p:nth-child(5)');
       let p5 = tip.querySelector('p:nth-child(6)');
       let startDate = WorkProjTip[projInd].pstartdate.substr(8,2);
       let startMonName = WorkProjTip[projInd].planned.substr(0,3);
       let startYear = WorkProjTip[projInd].pstartdate.substr(0,4);
       let endDate = WorkProjTip[projInd].penddate.substr(8,2);
       let endMonName = WorkProjTip[projInd].planned.substr(9,3);
       let endYear = WorkProjTip[projInd].penddate.substr(0,4);
       let projName = WorkProjTip[projInd].projectname;
       h4.innerText=`${projName}: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
       p1.innerText=`Duration: ${WorkProjTip[projInd].duration}`;
       p2.innerText=`Percentage Done: ${WorkProjTip[projInd].percentage}`;
       p3.innerText=`Status: ${WorkProjTip[projInd].statustext}`;
       p4.innerText=`Domain Lead: ${WorkProjTip[projInd].domainlead}`;
       p5.innerText=`Technical Lead: ${WorkProjTip[projInd].technicallead}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('#benefitsdrop').querySelector('.timelinetooltip');
        tip.style.display="none";
    }
}

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