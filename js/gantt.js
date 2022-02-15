
const prevGantt = document.querySelector('.gantt .slide_bottom .img1');
const nextGantt = document.querySelector('.gantt .slide_bottom .img2');
const ganttAppend = document.querySelector('.gantt .workloadrow1 > .col-md-12');
const tableprogAppend = document.querySelector('.gantt .workloadrow1 .tableprogian');
let gantIndex=0, monthNumber = 1, monthNumber2 = 0,year = 2021, dateIndex=0, loopcount = 1
timelineIndex=0,jIndex=0, projNameIndex=0, ganttAppearIndex= 0, fixedIndex= 1;
const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

(function createmulFirstDiv()
{  let j=1;
   let pInd=1;
   for(i=1; i<projectData.length+1; i++)
   {
       let div1 = document.createElement('div1');
       div1.setAttribute('class','first1');
       div1.innerHTML=`
       <div class="firstext"><p>Project 01</p></div>
       <div class="collapsed" data-bs-toggle="collapse"
           href="#collapseExample${i}" role="button" aria-expanded="false"
           aria-controls="collapseExample">
           <div class="gantpr gantpr1 timeline" startDay="${projectData[i - pInd].startExactDay}"></div>
       </div>
       <!-- hover popup -->
       <!-- // -->
       <!-- popdown collapse16-->
       <div class="collapse" id="collapseExample${i}">
           <div class="card card-body card-body-bg border-0 p-0">
               <div class="position-relative">
                   <div class="vl"></div>
               </div>
               <div class="milestonediv1">
                   <div
                       class="gantpr22 progress-bar rounded-1 milestonediv11  gantpr fs-4 onhover" data-bs-toggle="collapse" href="#milestoneExample${i}" role="button" aria-expanded="false" aria-controls="collapseExample1">
                       <span>Milestone1</span>
                   </div>
                   <div class="hide2 mt-0">
                       <p>Task1 : October 31 , 2021</p>
                       <p class="phide">Duration : 5 Days</p>
                       <p class="phide">Percentage Done : 100%</p>
                   </div>
               </div>
               <div class="milestonediv2 position-relative collapse" id="milestoneExample${i}">
                       <div class="v2"></div>
                       <div class="v3"></div>
                       <div class="v4"></div>
                       <div class="v5"></div>
                       <div class="v6"></div>
                   <div
                       class="gantpr22 rounded-1 milestonediv22 gantpr bg-secondary fs-4 progress-bar">
                       <span>Task-1</span></div>
                       <div
                       class="gantpr22 rounded-1 milestonediv22 gantprTask2 bg-secondary fs-4 progress-bar">
                       <span>Task-2</span></div>
               </div>
               <!--  -->
               <div class="milestonediv1">
                   <div
                       class="gantpr22 progress-bar rounded-1 milestonediv11  gantpr fs-4 onhover" data-bs-toggle="collapse" href="#milestoneExample${i+j}" role="button" aria-expanded="false" aria-controls="collapseExample3">
                       <span>Milestone-2</span>
                   </div>
                   <div class="hide2 mt-0">
                       <p>Task1 : October 31 , 2021</p>
                       <p class="phide">Duration : 5 Days</p>
                       <p class="phide">Percentage Done : 100%</p>
                   </div>
               </div>
               <div class="vl2"></div>
               <div class="milestonediv2 position-relative collapse" id="milestoneExample${i+j}">
                       <div class="v2"></div>
                       <div class="v3"></div>
                       <div class="v4"></div>
                       <div class="v5"></div>
                   <div
                       class="gantpr22 rounded-1 milestonediv22 gantpr bg-secondary fs-4 progress-bar">
                       <span>Task-1</span></div>
                       <div
                       class="gantpr22 rounded-1 milestonediv22 gantprTask2 bg-secondary fs-4 progress-bar">
                       <span>Task-2</span></div>
               </div>
               <!--  -->
           </div>
       </div>
       <!-- / -->
       `
       tableprogAppend.appendChild(div1);
   }
}());
(function clone()
{
   let refcloneNode = document.querySelector('.gantt #benefits2');
   for(let i=1; i<24; i++)
   {
       let getClone = refcloneNode.cloneNode(true);
       ganttAppend.insertBefore(getClone,ganttAppend.childNodes[i]);
   }
   showDate = document.querySelectorAll('.gantt .tablegantt tr:nth-child(2) th');
   ganttSlider = document.querySelectorAll('.gantt #benefits2');
   monthText = document.querySelectorAll('.gantt .tablecal1 .thspace p');
   projNameText = document.querySelectorAll('#benefits2 .first1 .firstext');
   ganttTimeline = document.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
   ganttSlider[12].classList.add('active');
})();

(function changingMonthName()
{
    let currYear=2021;
     for(let i=0;i<2;i++)
     {
        for(j=0; j<12; j++)
        {
            let childTimeline = ganttSlider[ganttAppearIndex].querySelectorAll('.timeline');
            monthText[ganttAppearIndex].innerText=`${month[j]} ${currYear}`;
            for(let k=0; k<projectData.length; k++)
            {
                childTimeline[k].classList.add(`ganttappear${fixedIndex}`);
            }
            fixedIndex++;
            ganttAppearIndex++;
        }
        fixedIndex=1;
        currYear++;
    }
    ganttAppear1 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear1');
    ganttAppear2 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear2');
    ganttAppear3 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear3');
    ganttAppear4 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear4');
    ganttAppear5 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear5');
    ganttAppear6 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear6');
    ganttAppear7 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear7');
    ganttAppear8 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear8');
    ganttAppear9 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear9');
    ganttAppear10 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear10');
    ganttAppear11 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear11');
    ganttAppear12 = document.querySelectorAll('.gantt #benefits2 .tableprogian .ganttappear12');
})();

function getMonthLength()
{
    MonthLength = new Date(year, monthNumber, 0).getDate();
};
getMonthLength();
function assignDate()
{
   for(k=0; k<2;k++)
   {
        for(let j=0;j<12;j++)
        {
            for(let i=1;i<MonthLength+1;i++)
            {
                let dayName = new Date(year, monthNumber2, i).toString().substr(0,3);
                showDate[dateIndex+i].classList.add('dateVirtual');
                showDate[dateIndex+i].innerHTML=`${dayName} <p>${i}</p>`;
            }
            dateIndex=loopcount*32;
            monthNumber++;
            getMonthLength();
            monthNumber2++;
            loopcount++;
        }
        year++;
        monthNumber=1;
        monthNumber2=0;
        getMonthLength();
   }
   
}
assignDate();
function assignProjectName()
{
    for(let i=0;i<ganttSlider.length;i++)
    {
        for(let j=0;j<projectData.length;j++)
        {
            projNameText[projNameIndex].innerText=projectData[j].projectname;
            projNameIndex++;
        }
    }
}
assignProjectName()

function calculateDays(e)
{
    let mobileWidth = e.target.querySelector('body').getBoundingClientRect().width;
    loopingYear = 2021;
    for(k=0; k<2; k++)
    {
        for(let j=0;j<12;j++)
        {
            for(let i=0;i<projectData.length;i++)
            {
                let date1 = new Date(projectData[i].pstartdate.substr(0,10).toString());
                let date2 = new Date(projectData[i].penddate.substr(0,10).toString());
                let projStartDate = projectData[i].planned.substr(0,3).toString();
                let getMonthIndex = getNumericMonth(projStartDate);
                let compareDate = new Date(`${loopingYear}/01/01`);
                let startDate = Math.floor(date1.getTime()/(3600*24*1000));
                let endDate = Math.floor(date2.getTime()/(3600*24*1000));
                let daysCount = endDate-startDate;
                let endTimeline = projectData[i].planned.substr(13,14);
                endTimeline = getTimeline(endTimeline, i, jIndex);
                endTimeline = +endTimeline;
                let monthstartDate = projectData[i].startMonth;
                let startYear = projectData[i].startMonth.substr(0,4);
                getMonthName(monthstartDate, startYear, k);
                compareYear = +startYear;
                prevYear = checkPrevYear(loopingYear,i,k);
                if(date1.getTime()<=compareDate.getTime())
                {
                    if(loopingYear>=compareYear && prevYear)
                    {
                        if(month1==='January 2021' || month1==='January 2022')
                        {
                            compareIndex1 = 0;
                            compareIndex2 = 1;
                            compareIndex3 = 2;
                            compareIndex4 = 3;
                            compareIndex5 = 4;
                            compareIndex6 = 5;
                            compareIndex7 = 6;
                            compareIndex8 = 7;
                            compareIndex9 = 8;
                            compareIndex10 = 9;
                            compareIndex11 = 10;
                            compareIndex12 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='February 2021' || month1==='February 2022')
                        {
                            compareIndex1 = 1;
                            compareIndex2 = 2;
                            compareIndex3 = 3;
                            compareIndex4 = 4;
                            compareIndex5 = 5;
                            compareIndex6 = 6;
                            compareIndex7 = 7;
                            compareIndex8 = 8;
                            compareIndex9 = 9;
                            compareIndex10 = 10;
                            compareIndex11 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='March 2021' || month1==='March 2022')
                        {
                            compareIndex1 = 2;
                            compareIndex2 = 3;
                            compareIndex3 = 4;
                            compareIndex4 = 5;
                            compareIndex5 = 6;
                            compareIndex6 = 7;
                            compareIndex7 = 8;
                            compareIndex8 = 9;
                            compareIndex9 = 10;
                            compareIndex10 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='April 2021' || month1==='April 2022')
                        {
                            compareIndex1 = 3;
                            compareIndex2 = 4;
                            compareIndex3 = 5;
                            compareIndex4 = 6;
                            compareIndex5 = 7;
                            compareIndex6 = 8;
                            compareIndex7 = 9;
                            compareIndex8 = 10;
                            compareIndex9 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='May 2021' || month1==='May 2022')
                        {
                            compareIndex1 = 4;
                            compareIndex2 = 5;
                            compareIndex3 = 6;
                            compareIndex4 = 7;
                            compareIndex5 = 8;
                            compareIndex6 = 9;
                            compareIndex7 = 10;
                            compareIndex8 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='June 2021' || month1==='June 2022')
                        {
                            compareIndex1 = 5;
                            compareIndex2 = 6;
                            compareIndex3 = 7;
                            compareIndex4 = 8;
                            compareIndex5 = 9;
                            compareIndex6 = 10;
                            compareIndex7 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='July 2021' || month1==='July 2022')
                        {
                            compareIndex1 = 6;
                            compareIndex2 = 7;
                            compareIndex3 = 8;
                            compareIndex4 = 9;
                            compareIndex5 = 10;
                            compareIndex6 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='August 2021' || month1==='August 2022')
                        {
                            compareIndex1 = 7;
                            compareIndex2 = 8;
                            compareIndex3 = 9;
                            compareIndex4 = 10;
                            compareIndex5 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='September 2021' || month1==='September 2022')
                        {
                            compareIndex1 = 8;
                            compareIndex2 = 9;
                            compareIndex3 = 10;
                            compareIndex4 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='October 2021' || month1==='October 2022')
                        {
                            compareIndex1 = 9;
                            compareIndex2 = 10;
                            compareIndex3 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='November 2021' || month1==='November 2022')
                        {
                            compareIndex1 = 10;
                            compareIndex2 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='December 2021' || month1==='December 2022')
                        {
                            compareIndex1 = 11;
                            // daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showGantt(daysCount,endTimeline,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                    }
                }
                else
                {
                    if(loopingYear>=compareYear && prevYear)
                    {
                        if(month1==='January 2021' || month1==='January 2022')
                        {
                            compareIndex1 = 0;
                            compareIndex2 = 1;
                            compareIndex3 = 2;
                            compareIndex4 = 3;
                            compareIndex5 = 4;
                            compareIndex6 = 5;
                            compareIndex7 = 6;
                            compareIndex8 = 7;
                            compareIndex9 = 8;
                            compareIndex10 = 9;
                            compareIndex11 = 10;
                            compareIndex12 = 11;
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='February 2021' || month1==='February 2022')
                        {
                            compareIndex1 = 1;
                            compareIndex2 = 2;
                            compareIndex3 = 3;
                            compareIndex4 = 4;
                            compareIndex5 = 5;
                            compareIndex6 = 6;
                            compareIndex7 = 7;
                            compareIndex8 = 8;
                            compareIndex9 = 9;
                            compareIndex10 = 10;
                            compareIndex11 = 11;
                            let hideExtraIndex = 1;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='March 2021' || month1==='March 2022')
                        {
                            compareIndex1 = 2;
                            compareIndex2 = 3;
                            compareIndex3 = 4;
                            compareIndex4 = 5;
                            compareIndex5 = 6;
                            compareIndex6 = 7;
                            compareIndex7 = 8;
                            compareIndex8 = 9;
                            compareIndex9 = 10;
                            compareIndex10 = 11;
                            let hideExtraIndex = 2;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='April 2021' || month1==='April 2022')
                        {
                            compareIndex1 = 3;
                            compareIndex2 = 4;
                            compareIndex3 = 5;
                            compareIndex4 = 6;
                            compareIndex5 = 7;
                            compareIndex6 = 8;
                            compareIndex7 = 9;
                            compareIndex8 = 10;
                            compareIndex9 = 11;
                            let hideExtraIndex = 3;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='May 2021' || month1==='May 2022')
                        {
                            compareIndex1 = 4;
                            compareIndex2 = 5;
                            compareIndex3 = 6;
                            compareIndex4 = 7;
                            compareIndex5 = 8;
                            compareIndex6 = 9;
                            compareIndex7 = 10;
                            compareIndex8 = 11;
                            let hideExtraIndex = 4;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='June 2021' || month1==='June 2022')
                        {
                            compareIndex1 = 5;
                            compareIndex2 = 6;
                            compareIndex3 = 7;
                            compareIndex4 = 8;
                            compareIndex5 = 9;
                            compareIndex6 = 10;
                            compareIndex7 = 11;
                            let hideExtraIndex = 5;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='July 2021' || month1==='July 2022')
                        {
                            compareIndex1 = 6;
                            compareIndex2 = 7;
                            compareIndex3 = 8;
                            compareIndex4 = 9;
                            compareIndex5 = 10;
                            compareIndex6 = 11;
                            let hideExtraIndex = 6;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='August 2021' || month1==='August 2022')
                        {
                            compareIndex1 = 7;
                            compareIndex2 = 8;
                            compareIndex3 = 9;
                            compareIndex4 = 10;
                            compareIndex5 = 11;
                            let hideExtraIndex = 7;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='September 2021' || month1==='September 2022')
                        {
                            compareIndex1 = 8;
                            compareIndex2 = 9;
                            compareIndex3 = 10;
                            compareIndex4 = 11;
                            let hideExtraIndex = 8;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='October 2021' || month1==='October 2022')
                        {
                            compareIndex1 = 9;
                            compareIndex2 = 10;
                            compareIndex3 = 11;
                            let hideExtraIndex = 9;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='November 2021' || month1==='November 2022')
                        {
                            compareIndex1 = 10;
                            compareIndex2 = 11;
                            let hideExtraIndex = 10;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='December 2021' || month1==='December 2022')
                        {
                            compareIndex1 = 11;
                            let hideExtraIndex = 11;
                            hideExtraIndex = getHideExtraIndex(hideExtraIndex,k);
                            let startDay = ganttTimeline[timelineIndex].getAttribute('startday');
                            hideExtraTimeline(hideExtraIndex, startDay);
                            daysCount = checkTargetDate(date1,date2,loopingYear,daysCount);
                            showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                    }
                }
               givebackground(i,daysCount);
            }
            jIndex++;
        }
        loopingYear++;
    }
}
window.addEventListener('load',calculateDays);

function showGantt(daysCount,endTimeline,j,mobileWidth)
{
    let totWidth = monthText[jIndex].closest('.table').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true){
        case (daysCount<=30):
        {
            ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${daysCount * 2.92}%`;
            ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                if(mobileWidth<700)
                {
                    showinMobile1(daysCount);
                }
            if(j>compareIndex1)
            {
                hidingGant();
            }
            break;
        }      
        case (daysCount>30 && daysCount<=60):
        {
            if(monthText[jIndex].innerText===month1)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            if(j>compareIndex2)
            {
                hidingGant();
            }
            remainDaysCount(endTimeline, mobileWidth); 
            break;  
        }
        case (daysCount>60 && daysCount<=90):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block"; 
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex3)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>90 && daysCount<=120):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex4)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>120 && daysCount<=150):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex5)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex6)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>180 && daysCount<=210):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex7)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>210 && daysCount<=240):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6
                || monthText[jIndex].innerText===month7)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex8)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>240 && daysCount<=270):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6
                || monthText[jIndex].innerText===month7 || monthText[jIndex].innerText===month8)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex9)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>270 && daysCount<=300):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6
                || monthText[jIndex].innerText===month7 || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex10)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>300 && daysCount<=330):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6
                || monthText[jIndex].innerText===month7 || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9
                || monthText[jIndex].innerText===month10)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);      
            if(j>compareIndex11)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>330 && daysCount<=360):
        {
            if(monthText[jIndex].innerText===month1 || monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3
                || monthText[jIndex].innerText===month4 || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6
                || monthText[jIndex].innerText===month7 || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9
                || monthText[jIndex].innerText===month10 || monthText[jIndex].innerText===month11)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
                break;
            }
            // if(j>compareIndex12)
            // {
            //     hidingGant();
            // }
            remainDaysCount(endTimeline, mobileWidth);      
            break;  
        }    
    }
}
function showAlternateGantt(daysCount,endTimeline,i,j,mobileWidth)
{
    let startTime = projectData[i].planned.substr(0,6).split(' ');
    startTime = +startTime[1] -1;
    let totWidth = monthText[jIndex].closest('.table').querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true)
    {
        case (daysCount<30):
        {
            ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.81)+11.3}%; width:${(daysCount*2.92)}%`;
            ganttTimeline[timelineIndex].closest('.first1').style.display="block";
            let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
            nearCollapse.style.marginLeft=`${(startTime*2.81)}%`;
                if(mobileWidth<700)
                {
                    showinMobile2(startTime,daysCount);
                }
            if(j>compareIndex1)
            {
                hidingGant();
            }
            break;
        }
        case (daysCount>30 && daysCount<=60):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex2)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>60 && daysCount<=90):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex3)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>90 && daysCount<=120):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex4)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>120 && daysCount<=150):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex5)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex6)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>180 && daysCount<=210):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex7)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>210 && daysCount<=240):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6 || monthText[jIndex].innerText===month7)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex8)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>240 && daysCount<=270):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6 || monthText[jIndex].innerText===month7
                || monthText[jIndex].innerText===month8)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex9)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>270 && daysCount<=300):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6 || monthText[jIndex].innerText===month7
                || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex10)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>300 && daysCount<=330):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6 || monthText[jIndex].innerText===month7
                || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9 || monthText[jIndex].innerText===month10)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex11)
            {
                hidingGant();
            }
            break;  
        }
        case (daysCount>330 && daysCount<=360):
        {
            if(monthText[jIndex].innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[timelineIndex].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                break;
            }
            else if(monthText[jIndex].innerText===month2 || monthText[jIndex].innerText===month3 || monthText[jIndex].innerText===month4
                || monthText[jIndex].innerText===month5 || monthText[jIndex].innerText===month6 || monthText[jIndex].innerText===month7
                || monthText[jIndex].innerText===month8 || monthText[jIndex].innerText===month9 || monthText[jIndex].innerText===month10
                || monthText[jIndex].innerText===month11)
            {
                ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[timelineIndex].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
                break;
            }
            remainDaysCount(endTimeline, mobileWidth);
            if(j>compareIndex12)
            {
                hidingGant();
            }
            break;  
        }
    }
}
function getNumericMonth(startDate)
{
    return (String(['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'].indexOf(startDate) + 1).padStart(2, '0'))
}
function getTimeline(endTimeline,i,jIndex)
{
    let year1 = projectData[i].pstartdate.substr(0,4);
    let month = monthText[jIndex].innerText.split(' ');
    let year2 = +month[1];
    if(year2>year1)
    {
        console.log('hello');
        return endTimeline = 31;
    }
    else
    {
        return endTimeline;
    }
}
function showinMobile1(multiplyTerm)
{
    ganttTimeline[timelineIndex].style.cssText=`margin-left:23.2%; width:${multiplyTerm *9.8}%`;
}
function showinMobile2(startTime, multiplyTerm)
{
    ganttTimeline[timelineIndex].style.cssText=`margin-left:${(startTime*9.8)+23.2}%; width:${multiplyTerm *9.8}%`;
}
function showinMobile4(multiplyTerm)
{
    ganttTimeline[timelineIndex].style.cssText=`margin-left:23.2%; width:${multiplyTerm *9.8}%`;
}
function checkTargetDate(date1,date2,loopingYear,daysCount)
{
    date2 = new Date(date2);
    let TargetDate = new Date(`${loopingYear}/12/31`);
    if(date2.getTime()>TargetDate.getTime())
    {
        var d1 = Math.floor(TargetDate.getTime()/(3600*24*1000));
        var d2 = Math.floor(date1.getTime()/(3600*24*1000));
        return daysCount = d1 - d2;
    }
    else
    {
        return daysCount;
    }
}
function getHideExtraIndex(hideExtraIndex,k)
{
    let newhideExtraIndex = hideExtraIndex;
    if(k>0)
    {
        newhideExtraIndex = hideExtraIndex + 12;
    }
    else if(k>1)
    {
        newhideExtraIndex = hideExtraIndex + 24;
    }
    else if(k>2)
    {
        newhideExtraIndex = hideExtraIndex + 36;
    }
    else if(k>3)
    {
        newhideExtraIndex = hideExtraIndex + 48;
    }
    return newhideExtraIndex;
}
function checkPrevYear(loopingYear,i,k)
{
    let booleanYear = true;
    let prevYear2 = projectData[i].penddate.substr(0,4);
    switch(true)
    {
        case (k>0 && loopingYear>prevYear2):
        {
            booleanYear = false;
            break;
        }
        case (k>1 && loopingYear>prevYear2):
        {
            booleanYear = false;
            break;
        }
        case (k>2 && loopingYear>prevYear2):
        {
            booleanYear = false;
            break;
        }
        case (k>3 && loopingYear>prevYear2):
        {
            booleanYear = false;
            break;
        }
    }
    return booleanYear;
}
function getMonthName(name, year,k)
{
    let d = new Date(`${name}`);
    let dt = new Date(d.setMonth(d.getMonth() +0));
    month1 = dt.toLocaleString('en-us', { month: 'long' });
    month1 = `${month1} ${year.toString()}`;
    month1 = getMonth1(d,year,k, month1);

    let dt2 = new Date(d.setMonth(d.getMonth() +1));
    month2 = dt2.toLocaleString('en-us', { month: 'long' });
    month2 = `${month2} ${year.toString()}`;
    month2 = getMonth1(d,year,k, month2);

    let dt3 = new Date(d.setMonth(d.getMonth() +1));
    month3 = dt3.toLocaleString('en-us', { month: 'long' });
    month3 = `${month3} ${year.toString()}`;

    let dt4 = new Date(d.setMonth(d.getMonth() +1));
    month4 = dt4.toLocaleString('en-us', { month: 'long' });
    month4 = `${month4} ${year.toString()}`;

    let dt5 = new Date(d.setMonth(d.getMonth() +1));
    month5 = dt5.toLocaleString('en-us', { month: 'long' });
    month5 = `${month5} ${year.toString()}`;

    let dt6 = new Date(d.setMonth(d.getMonth() +1));
    month6 = dt6.toLocaleString('en-us', { month: 'long' });
    month6 = `${month6} ${year.toString()}`;

    let dt7 = new Date(d.setMonth(d.getMonth() +1));
    month7 = dt7.toLocaleString('en-us', { month: 'long' });
    month7 = `${month7} ${year.toString()}`;

    let dt8 = new Date(d.setMonth(d.getMonth() +1));
    month8 = dt8.toLocaleString('en-us', { month: 'long' });
    month8 = `${month8} ${year.toString()}`;

    let dt9 = new Date(d.setMonth(d.getMonth() +1));
    month9 = dt9.toLocaleString('en-us', { month: 'long' });
    month9 = `${month9} ${year.toString()}`;

    let dt10 = new Date(d.setMonth(d.getMonth() +1));
    month10 = dt10.toLocaleString('en-us', { month: 'long' });
    month10 = `${month10} ${year.toString()}`;

    let dt11 = new Date(d.setMonth(d.getMonth() +1));
    month11 = dt11.toLocaleString('en-us', { month: 'long' });
    month11 = `${month11} ${year.toString()}`;

    let dt12 = new Date(d.setMonth(d.getMonth() +1));
    month12 = dt12.toLocaleString('en-us', { month: 'long' });
    month12 = `${month12} ${year.toString()}`;
}
function getMonth1(d, year,k, month1)
{
    if(k>0 && year < 2022)
    {
        switch(true)
        {
            case month1.includes('January 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +12));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('February 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +11));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('March 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +10));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('April 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +9));
                month1 =  getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('May 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +8));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('June 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +7));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('July 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +6));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('August 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +5));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('September 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +4));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('October 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +3));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('November 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +2));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
            case month1.includes('December 2021'):
            {
                let dt = new Date(d.setMonth(d.getMonth() +1));
                month1 = getChildMonth(month1, dt, year);
                break;
            }
        }
        return month1;
    }
    else
    {
        return month1;
    }
}
function getChildMonth(childMonth, dt, year)
{
    childMonth = dt.toLocaleString('en-us', { month: 'long' });
    year++;
    return childMonth = `${childMonth} ${year.toString()}`;
}
function remainDaysCount(endTimeline, mobileWidth)
{
    ganttTimeline[timelineIndex].closest('.first1').style.display="block";
    ganttTimeline[timelineIndex].style.cssText=`margin-left:11.3%; width:${endTimeline * 2.83}%`;
    if(mobileWidth<700)
    {
        showinMobile3(endTimeline);
    }
}
function showinMobile3(endTimeline)
{
    ganttTimeline[timelineIndex].style.cssText=`margin-left:23.2%; width:${endTimeline * 9.8}%`;
}
function hidingGant()
{
    let parent = ganttTimeline[timelineIndex].closest('.first1');
    parent.style.display="none";
}
function hideExtraTimeline(index, startDay)
{
    index2=index;
    for(let i=0;i<index2;i++)
    {
        index--;
        let timeline = ganttSlider[index].querySelectorAll('.timeline');
        timeline.forEach((timeline)=>
        {
            let value = timeline.getAttribute('startday');
            if(value === startDay)
            {
                timeline.closest('.first1').style.display="none";
            }
        })
    }
}
function givebackground(i,daysCount)
{
    ganttTimeline[timelineIndex].style.backgroundColor=`${projectData[i].statusclass}`;
    ganttTimeline[timelineIndex].innerText=`${projectData[i].planned} ${daysCount +1} days`;
    timelineIndex++;
}

for(let i=0;i<ganttAppear1.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear1[i].index=i;
        ganttAppear1[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear2.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear2[i].index=i;
        ganttAppear2[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear3.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear3[i].index=i;
        ganttAppear3[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear4.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear4[i].index=i;
        ganttAppear4[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear5.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear5[i].index=i;
        ganttAppear5[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear6.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear6[i].index=i;
        ganttAppear6[i].addEventListener(e,showTimelineTip);
    })
}
for(let i=0;i<ganttAppear7.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttAppear7[i].index=i;
        ganttAppear7[i].addEventListener(e,showTimelineTip);
    })
}
function showTimelineTip(e)
{
    if(e.type==="mouseover")
    {
       let projdataInd=this.index;
       switch(true)
       {
           case (projdataInd>6 && projdataInd<14):
           {
               projdataInd= projdataInd - 7;
                break;
           }
           case (projdataInd>13 && projdataInd<21):
           {
               projdataInd= projdataInd - 14;
               break;
           }
           case (projdataInd>20 && projdataInd<28):
           {
               projdataInd= projdataInd - 21;
               break;
           }
           case (projdataInd>27 && projdataInd<35):
           {
               projdataInd= projdataInd - 28;
               break;
           }
           case (projdataInd>34 && projdataInd<42):
           {
               projdataInd= projdataInd - 35;
               break;
           }
       }
       let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top}px; left:${left}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let p4 = tip.querySelector('p:nth-child(5)');
       let p5 = tip.querySelector('p:nth-child(6)');
       let p6 = tip.querySelector('p:nth-child(7)');
       h4.innerText=`Wireframe: ${projectData[projdataInd].startMonth}`;
       p1.innerText=`Duration: ${projectData[projdataInd].duration}`;
       p2.innerText=`Percentage Done: ${projectData[projdataInd].percentage}`;
       p3.innerText=`Status: ${projectData[projdataInd].statustext}`;
       p4.innerText=`Program Manager: ${projectData[projdataInd].programmanager}`;
       p5.innerText=`Domain Lead: ${projectData[projdataInd].domainlead}`;
       p6.innerText=`Technical Lead: ${projectData[projdataInd].technicallead}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
        tip.style.display="none";
    }
}

nextGantt.addEventListener('click',(e)=>
{
    let nextElement = e.target.closest('.workloadrow1').querySelector('.tablecal.active');
    nextElement.classList.remove('active');
    if(nextElement.nextElementSibling.classList.contains('timelinetooltip'))
    {
        ganttSlider[0].classList.add('active');
        return;
    }
    nextElement.nextElementSibling.classList.add('active');
})
prevGantt.addEventListener('click',(e)=>
{
    let prevElement = e.target.closest('.workloadrow1').querySelector('.tablecal.active');
    if(prevElement.previousElementSibling==null)
    {
       return false;
    }
    prevElement.classList.remove('active');
    prevElement.previousElementSibling.classList.add('active');
})