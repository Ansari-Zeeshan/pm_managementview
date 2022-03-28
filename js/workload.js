const workShowTable = document.querySelectorAll('.workload table tr:nth-child(2)');
const workload = document.querySelector('.workload');
const workTable1 = workload.querySelector('#tablehide');
const workTable2 = workload.querySelector('#benefits');
const workTable3 = workload.querySelector('#benefitsdrop');
const workTab3Append = workload.querySelector('#benefitsdrop .tableprogian');
const workTab3tr = workload.querySelector('#benefitsdrop table tbody');
const workProjOpt = workload.querySelectorAll('.select-box .options-container .option');
const prevWork = document.querySelector('.workload .slide_bottom .img1');
const nextWork = document.querySelector('.workload .slide_bottom .img2');
let workYear = 2021, workMonNum = 1, workMonNum2 = 0, workMonCount = 0, fixedHeight = 30, combinedVal = [], dateVal = [],
monthVal = [], yearVal = [];
let workMonText, workYearText, projName, taskList, dropProjTip, dropTaskTip;

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
                <div class="img_emp"><img src="img/client1.jpg" class="mr-2" alt="">${WorkProject[i].employee[j].employeename}</div>
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
   taskList = workload.querySelectorAll('#benefitsdrop .projectname taskProj');
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
        let projStartMonth = WorkProject[j].employee[i].startExactDay.substr(3,3).toString();
        let getMonthIndex = getNumericMonth(projStartMonth);
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
        let startMText = WorkProject[j].employee[i].startExactDay.substr(3,4);
        let minusVal = WorkProject[j].employee[i].startExactDay.substr(0,2);
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
            let projStartDate = WorkProject[k].employee[j].task[i].startExactDay.substr(3,3).toString();
            let getMonthIndex = getNumericMonth(projStartDate);
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
            let startMText = WorkProject[k].employee[j].task[i].startExactDay.substr(3,4);
            let minusVal = WorkProject[k].employee[j].task[i].startExactDay.substr(0,2);

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
    checkCollidePart()
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
    workTimeline[i].style.cssText=`margin-left:10.21vw; width:${endTimeline * 2.5}vw; height:10px`;
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
       let redTimeline = emp[i].querySelectorAll('.projTimeline .redprog-bar');
       let task = emp[i].querySelectorAll('.taskProj .progress-bar');
       for(let j=0; j<task.length; j++)
       {
            let start = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(8,2);  
            let end = +WorkProject[projInd].employee[i].task[j].penddate.substr(8,2);
            let startMon = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(5,2);  
            let endMon = +WorkProject[projInd].employee[i].task[j].penddate.substr(5,2);  
            let startYear = +WorkProject[projInd].employee[i].task[j].pstartdate.substr(0,4);  
            for(let k=start; k<=end; k++)
            {
                combinedVal.push(k);
            }
            dateVal.push(start,end);
            monthVal.push(startMon, endMon);
            yearVal.push(startMon, startYear);
        }
        let dupElement = [];
        dupElement = toFindDupElement(combinedVal);
        if(dupElement.length>0)
        {
            let collInd = findCollInd(dateVal);
            let monthInd = monthVal[collInd];
            monthInd = monthInd - 1;
            let monname = month[monthInd].substr(0,3);
            let startTime = dupElement[0];
            let endTimeline = dupElement[dupElement.length - 1];
            let daysCount = dupElement.length -1;
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
            prevYear = checkWorkPrevYear(appearYear, collEndYear, collStartYear, i, redTimeline);
            let minusVal = startTime;
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=collStartYear && prevYear)
                {
                    if(month1===`January ${appearYear}`)
                    {
                        daysCount = checkWorkTargetDate2(date2,i,daysCount,appearYear,collStartYear);
                        showWorkCollload(daysCount,endTimeline,i,redTimeline,mobileWidth);
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
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`February ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`March ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`April ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`May ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`June ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`July ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`August ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`September ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`October ${appearYear}`)
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`November ${appearYear}`)
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1===`December ${appearYear}`)
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlterWorkCollload(daysCount,endTimeline,i,redTimeline,startTime,monname,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
        }
        combinedVal = [];
        dateVal = [];
   }
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
    for(let i=0; i<dateVal.length; i++)
    {
        if(dateVal[i+1]>=dateVal[i+2])
        {
            return i+1;
        }
    }
}

function showWorkCollload(daysCount,endTimeline,i,workTimeline,mobileWidth)
{
    let totWidth = workTimeline[i].closest('table').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let dateText = `${workMonText[2].innerText} ${workYearText[2].innerText}`;
    
    switch(true){
        case (daysCount<=30):
        {
            if(dateText===month1)
            {
                let ganttWidth = (daysCount +1) * 2.5;
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                    if(mobileWidth<700)
                    {
                        showinMobile1(i,daysCount,workTimeline);
                    }
            }
            else
            {
                workTimeline[i].style.display="none";
            }
            break;
        }      
        case (daysCount>30 && daysCount<=58):
        {
            if(dateText===month1)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
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
                workTimeline[i].style.display="none";
            }
            break;  
        }
        case (daysCount>58 && daysCount<=89):
        {
            if(dateText===month1 || dateText===month2)
            {
                let ganttWidth = totWidth *2.5; 
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
                workTimeline[i].style.display="none";
            }
            break;  
        }
        case (daysCount>89 && daysCount<=119):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3)
            {
                let ganttWidth = totWidth *2.5;
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
                workTimeline[i].style.display="none";
            }
            break;  
        }
        case (daysCount>119 && daysCount<=150):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4)
            {
                let ganttWidth = totWidth *2.5;
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
                workTimeline[i].style.display="none";
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4 || dateText===month5)
            {
                let ganttWidth = totWidth *2.5;
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
                workTimeline[i].style.display="none";
            }
            break;  
        }
        case (daysCount>180 && daysCount<=211):
        {
            if(dateText===month1 || dateText===month2 || dateText===month3
                || dateText===month4 || dateText===month5 || dateText===month6)
            {
                let ganttWidth = totWidth *2.5;
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.display="none";
            }
            break;  
        }    
    }               
}
function showAlterWorkCollload(daysCount,endTimeline,i,workTimeline,startTime,startMText,minusVal,mobileWidth)        
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,daysCount,workTimeline);               
                    }
            }        
            else
            {
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2)
            {                
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw`;
                remainWorkDaysCount(endTimeline, workTimeline, mobileWidth, i);
            }
            else
            {
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }  
            }
            else if(dateText===month2)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5 || dateText===month6)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,workTimeline);
                    }
            }
            else if(dateText===month2 || dateText===month3 || dateText===month4
                || dateText===month5 || dateText===month6 || dateText===month7)
            {
                let ganttWidth = totWidth *2.5;
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
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
                workTimeline[i].style.cssText=`display:block; margin-left:${marLeft}vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.cssText=`display:block; margin-left:10.21vw; width:${ganttWidth}vw; height: 10px;`;
                
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
                workTimeline[i].style.display="none";
            }
            break;  
        }    
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