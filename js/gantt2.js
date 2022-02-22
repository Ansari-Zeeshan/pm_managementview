
const prevGantt = document.querySelector('.gantt .slide_bottom .img1');
const nextGantt = document.querySelector('.gantt .slide_bottom .img2');
const ganttAppend = document.querySelector('.gantt .workloadrow1 > .col-md-12');
const tableprogAppend = document.querySelector('.gantt .workloadrow1 .tableprogian');
let gantIndex=0, monthNumber = 1, monthNumber2 = 0,year = 2021, projNameIndex=0, monthCount = 0;
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
   showDate = document.querySelectorAll('.gantt .tablegantt tr:nth-child(2) th');
   monthText = document.querySelector('.gantt .tablecal1 .thspace p');
   projNameText = document.querySelectorAll('#benefits2 .first1 .firstext');
   ganttTimeline = document.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
   hoverProject2 = document.querySelectorAll('.gantt #benefits2 .tableprogian .firstext');
}());

function getMonthLength()
{
    MonthLength = new Date(year, monthNumber, 0).getDate();
};
getMonthLength();
function assignDate()
{
    monthText.innerText=`${month[monthCount]} ${year}`;
    showDate.forEach((show)=>
    {
        show.classList.remove('dateVirtual');
    })
    for(let i=1;i<MonthLength+1;i++)
    {
        let dayName = new Date(year, monthNumber2, i).toString().substr(0,3);
        showDate[i].classList.add('dateVirtual');
        showDate[i].innerHTML=`${dayName} <p>${i}</p>`;
    }
}
assignDate();

function assignProjectName()
{
    for(let i=0;i<projectData.length;i++)
    {
        projNameText[projNameIndex].innerText=projectData[i].projectname;
        projNameIndex++;
    }
}
assignProjectName()
nextGantt.addEventListener('click',()=>
{
    monthCount++;
    monthNumber++;
    monthNumber2++;
    if(monthCount>11)
    {
        monthCount=0;
        year++;
        monthNumber=1;
        monthNumber2=0;
    }
    getMonthLength();
    assignDate();
    calculateDays();
})
prevGantt.addEventListener('click',()=>
{
    monthCount--;
    monthNumber--;
    monthNumber2--;
    if(monthCount<0 && year>2021)
    {
        monthCount=11;
        year--;
        monthNumber=12;
        monthNumber2=11;
    }
    else if(monthCount<0 && year == 2021)
    {
        monthCount=0;
        monthNumber=1;
        monthNumber2=0;
        return false;
    }
    getMonthLength();
    assignDate();
    calculateDays();
})
function calculateDays()
{
    let mobileWidth = body;    
        for(let i=0;i<projectData.length;i++)
        {
            let date1 = new Date(projectData[i].pstartdate.substr(0,10).toString());
            let date2 = new Date(projectData[i].penddate.substr(0,10).toString());
            let projStartDate = projectData[i].planned.substr(0,3).toString();
            let getMonthIndex = getNumericMonth(projStartDate);
            let startYear = projectData[i].startMonth.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate-startDate;
            let monthAppear = monthText.innerText.split(' ');
            let appearYear = +monthAppear[1];
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = projectData[i].planned.substr(13,14);
            endTimeline = getTimeline(endTimeline, i, appearYear);
            endTimeline = +endTimeline;
            getMonthName(getMonthIndex, appearYear, i);
            prevYear = checkPrevYear(i, appearYear);
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                        showGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                    || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                    || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                    || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                    || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                    || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                    || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                    || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                    || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                    || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                    || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                    || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
            givebackground(i,daysCount);
        }
}
calculateDays();

function showGantt(daysCount,endTimeline,i,mobileWidth)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true){
        case (daysCount<=30):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${daysCount * 2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile1(daysCount);
                    }
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;
        }      
        case (daysCount>30 && daysCount<=58):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month2)
            {
                remainDaysCount(endTimeline, mobileWidth, i); 
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>58 && daysCount<=89):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block"; 
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>89 && daysCount<=119):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>119 && daysCount<=150):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>180 && daysCount<=211):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else 
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>211 && daysCount<=242):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                || monthText.innerText===month7)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else 
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>242 && daysCount<=272):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                || monthText.innerText===month7 || monthText.innerText===month8)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else 
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>272 && daysCount<=303):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else 
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>303 && daysCount<=333):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                || monthText.innerText===month10)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            else 
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>333 && daysCount<=365):
        {
            if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                || monthText.innerText===month10 || monthText.innerText===month11)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(totWidth);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, mobileWidth, i);      
            }
            break;  
        }    
    }
}
function showAlternateGantt(daysCount,endTimeline,i,mobileWidth)
{
    let startTime = projectData[i].planned.substr(0,6).split(' ');
    startTime = +startTime[1] -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    // updateValue();
    switch(true)
    {
        case (daysCount<=totWidth):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(daysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.81)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,daysCount);
                    }
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;
        }
        case (daysCount>30 && daysCount<=60):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>60 && daysCount<=90):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
                compareIndex3++;    
            }
            else if(monthText.innerText===month2)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>90 && daysCount<=120):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>120 && daysCount<=150):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>150 && daysCount<=180):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(totWidth);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>180 && daysCount<=210):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>210 && daysCount<=240):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>240 && daysCount<=270):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>270 && daysCount<=300):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>300 && daysCount<=330):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
            }
            else
            {
                ganttTimeline[i].closest('.first1').style.display="none";
            }
            break;  
        }
        case (daysCount>330 && daysCount<=365):
        {
            if(monthText.innerText===month1)
            {
                let localdaysCount=totWidth - startTime;
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                let nearCollapse = ganttTimeline[i].closest('.first1').querySelector('.collapse');
                nearCollapse.style.marginLeft=`${(startTime*2.92)}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(startTime,localdaysCount);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10
                || monthText.innerText===month11)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(totWidth);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, mobileWidth, i);
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
        'Dec'].indexOf(startDate)).padStart(2, '0'))
}
function getTimeline(endTimeline,i,year2)
{
    let year1 = projectData[i].penddate.substr(0,4);
    if(year2<year1)
    {
        return endTimeline = 31;
    }
    else
    {
        return endTimeline;
    }
}
function checkPrevYear(i,year2)
{
    let booleanYear = true;
    let prevYear2 = projectData[i].penddate.substr(0,4);
    if(year2>prevYear2)
    {
        booleanYear=false;
    }
    return booleanYear;
}
function checkTargetDate2(date2,i,daysCount,year2)
{
    let year1 = projectData[i].pstartdate.substr(0,4);
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
function checkTargetDate(date1,date2,daysCount, year2)
{
    date2 = new Date(date2);
    let TargetDate = new Date(`${year2}/12/31`);
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
function getMonthName(monthIndex, year2, i)
{
    let year = year2;
    let year1 = projectData[i].pstartdate.substr(0,4);
    if(year2>year1)
    {
        monthIndex = 0;
        let monthName1 = month[monthIndex];
        month1 = `${monthName1} ${year}`;

        monthIndex++;        
        let monthName2 = month[monthIndex];
        month2 = `${monthName2} ${year}`;
        
        monthIndex++;
        let monthName3 = month[monthIndex];
        month3 = `${monthName3} ${year}`;
        
        monthIndex++;
        let monthName4 = month[monthIndex];
        month4 = `${monthName4} ${year}`;
        
        monthIndex++;
        let monthName5 = month[monthIndex];
        month5 = `${monthName5} ${year}`;
        
        monthIndex++;
        let monthName6 = month[monthIndex];
        month6 = `${monthName6} ${year}`;
        
        monthIndex++;
        let monthName7 = month[monthIndex];
        month7 = `${monthName7} ${year}`;
        
        monthIndex++;
        let monthName8 = month[monthIndex];
        month8 = `${monthName8} ${year}`;
        
        monthIndex++;
        let monthName9 = month[monthIndex];
        month9 = `${monthName9} ${year}`;
        
        monthIndex++;
        let monthName10 = month[monthIndex];
        month10 = `${monthName10} ${year}`;
        
        monthIndex++;
        let monthName11 = month[monthIndex];
        month11 = `${monthName11} ${year}`;
        
        monthIndex++;
        let monthName12 = month[monthIndex];
        month12 = `${monthName12} ${year}`;
    }
    else
    {
        monthIndex = checkMonthIndex(monthIndex);
        let monthName1 = month[monthIndex];
        month1 = `${monthName1} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName2 = month[monthIndex];
        month2 = `${monthName2} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName3 = month[monthIndex];
        month3 = `${monthName3} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName4 = month[monthIndex];
        month4 = `${monthName4} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName5 = month[monthIndex];
        month5 = `${monthName5} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName6 = month[monthIndex];
        month6 = `${monthName6} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName7 = month[monthIndex];
        month7 = `${monthName7} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName8 = month[monthIndex];
        month8 = `${monthName8} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName9 = month[monthIndex];
        month9 = `${monthName9} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName10 = month[monthIndex];
        month10 = `${monthName10} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName11 = month[monthIndex];
        month11 = `${monthName11} ${year}`;
    
        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName12 = month[monthIndex];
        month12 = `${monthName12} ${year}`;
    }
}
function updateYear(monthIndex, year)
{
    if(monthIndex > 11)
    {
        let newyear = +year;
        year = newyear + 1;
        return year;
    }
    else
    {
        return year;
    }
}
function checkMonthIndex(monthIndex)
{
    if(monthIndex>11)
    {
        return monthIndex = 0;
    }
    else
    {
        return +monthIndex;
    }
}

function updateValue()
{
    switch(true)
    {
        case (month1.includes('January')):
            {
                val1 = 30;
                val2 = 58;
                val3 = 89;
                val4 = 119;
                val5 = 150;
                val6 = 180;
                val7 = 211;
                val8 = 242;
                val9 = 272;
                val10 = 303;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('February')):
            {
                val1 = 27;
                val2 = 58;
                val3 = 88;
                val4 = 119;
                val5 = 149;
                val6 = 180;
                val7 = 211;
                val8 = 241;
                val9 = 272;
                val10 = 302;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('March')):
            {
                val1 = 30;
                val2 = 60;
                val3 = 91;
                val4 = 121;
                val5 = 152;
                val6 = 183;
                val7 = 213;
                val8 = 244;
                val9 = 274;
                val10 = 305;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('April')):
            {
                val1 = 29;
                val2 = 60;
                val3 = 90;
                val4 = 121;
                val5 = 152;
                val6 = 182;
                val7 = 213;
                val8 = 243;
                val9 = 274;
                val10 = 305;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('May')):
            {
                val1 = 30;
                val2 = 60;
                val3 = 91;
                val4 = 122;
                val5 = 152;
                val6 = 183;
                val7 = 213;
                val8 = 244;
                val9 = 274;
                val10 = 305;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('June')):
            {
                val1 = 30;
                val2 = 61;
                val3 = 92;
                val4 = 122;
                val5 = 153;
                val6 = 183;
                val7 = 214;
                val8 = 245;
                val9 = 275;
                val10 = 305;
                val11 = 333;
                val12 = 365;
            }
        case (month1.includes('July')):
            {
                val1 = 31;
                val2 = 62;
                val3 = 92;
                val4 = 122;
                val5 = 153;
                val6 = 183;
                val7 = 214;
                val8 = 245;
                val9 = 275;
                val10 = 305;
                val11 = 333;
                val12 = 365;
            }                        
    }
}
function remainDaysCount(endTimeline, mobileWidth, i)
{
    ganttTimeline[i].closest('.first1').style.display="block";
    ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${endTimeline * 2.83}%`;
    if(mobileWidth<700)
    {
        showinMobile3(endTimeline);
    }
}
function showinMobile1(multiplyTerm)
{
    ganttTimeline[i].style.cssText=`margin-left:23.2%; width:${multiplyTerm *9.67}%`;
}
function showinMobile2(startTime, multiplyTerm)
{
    ganttTimeline[i].style.cssText=`margin-left:${(startTime*9.67)+23.2}%; width:${multiplyTerm *9.67}%`;
}
function showinMobile3(endTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:23.2%; width:${endTimeline * 9.67}%`;
}
function showinMobile4(multiplyTerm)
{
    ganttTimeline[i].style.cssText=`margin-left:23.2%; width:${multiplyTerm *9.67}%`;
}

function givebackground(i,daysCount)
{
    ganttTimeline[i].style.backgroundColor=`${projectData[i].statusclass}`;
    ganttTimeline[i].innerText=`${projectData[i].planned} ${daysCount +1} days`;
    i++;
}

// showing project name on hover
(function makingTooltip()
{
    hoverProject2.forEach((hover)=>
    {
        let p = hover.innerHTML;
        if(p.length>25)
        {
            hover.setAttribute('data-bs-toggle','tooltip');
            hover.setAttribute('data-bs-placement','bottom');
            hover.setAttribute('title',`${p}`);
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        }
    })
}());

for(let i=0;i<ganttTimeline.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttTimeline[i].index=i;
        ganttTimeline[i].addEventListener(e,showTimelineTip);
    })
}
function showTimelineTip(e)
{
    if(e.type==="mouseover")
    {
       let projdataInd=this.index;
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
