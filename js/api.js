
const projectData = [
  {
     "projectrequestid":"271",
     "projectrefid":"PR-3568",
     "planned":"Apr 01 - Jun 30",
     "pstartdate":"2022-04-01T08:04:00.000Z",
     "penddate":"2022-06-30T08:06:00.000Z",
     "actual":" - ",
     "astartdate":null,
     "aenddate":null,
     "projectname":"PMO PROJECT",
     "projectdesc":null,
     "budgetedamount":"420000.00",
     "actualbudget":"10000.00",
     "statusid":500,
     "statustext":"In Progress",
     "statusclass":"#eeab53",
     "projectlead":"Kannan Parthasarathy",
     "projectleadimage":null,
     "domain_leadid":"685",
     "domainlead":"Lijo Kankapadan",
     "domainleadimage":null,
     "milestone_count":"3",
     "creater_id":"4744",
     "businessunitid":null,
     "changedenddate":null,
     "planningefforts":null,
     "changedapprovedbudget":null,
     "businesspriorityid":null,
     "scrummasterid":null,
     "businessprojectmanagerid":null,
     "projectphase":null,
     "projectpercentage":"0",
     "iseditable":true,
     "chatcount":"0",
     "isread":false,
     "is_mgt_created":true
  },
  {
     "projectrequestid":"272",
     "projectrefid":"PR-14DA",
     "planned":"Apr 01 - May 31",
     "pstartdate":"2022-03-31T20:00:00.000Z",
     "penddate":"2022-05-30T20:00:00.000Z",
     "actual":"Mar 23 - Mar 23",
     "astartdate":"2022-03-23T02:29:39.830Z",
     "aenddate":"2022-03-23T02:29:39.901Z",
     "projectname":"PM DEMO PROJECT",
     "projectdesc":"DEMO",
     "budgetedamount":"450000.00",
     "actualbudget":"20000.00",
     "statusid":505,
     "statustext":"Approved",
     "statusclass":"#1fc875",
     "projectlead":"Prashant khedkar",
     "projectleadimage":null,
     "domain_leadid":"8641",
     "domainlead":"Colin Quadros",
     "domainleadimage":null,
     "milestone_count":"13",
     "creater_id":"4744",
     "businessunitid":"7,9",
     "changedenddate":"2022-03-23T02:29:39.901Z",
     "planningefforts":"1",
     "changedapprovedbudget":null,
     "businesspriorityid":2,
     "scrummasterid":"Tariq Eqbal",
     "businessprojectmanagerid":null,
     "projectphase":"2",
     "projectpercentage":"10",
     "iseditable":false,
     "chatcount":"0",
     "isread":false,
     "is_mgt_created":false
  }
]

const milestoneData = [
  {
    'project':
    [
      {
        "taskid":"380",
        "projectid":"271",
        "taskname":"M1",
        "taskdesc":null,
        "ownerid":null,
        "ownername":null,
        "ownerimage":"",
        "statusid":204,
        "statustext":"Backlog",
        "statusclass":"#6f8693",
        "planned":"Apr 01 - May 31",
        "actual":" - ",
        "pstartdate":"2022-03-31T20:00:00.000Z",
        "penddate":"2022-05-30T20:00:00.000Z",
        "tasks_count":"4",
        "createdby":"4744",
        "taskpriority":0,
        "percentage":0
      },
      {
        "taskid":"394",
        "projectid":"271",
        "taskname":"M2",
        "taskdesc":null,
        "ownerid":null,
        "ownername":null,
        "ownerimage":"",
        "statusid":204,
        "statustext":"Backlog",
        "statusclass":"#6f8693",
        "planned":"Apr 05 - Jun 25",
        "actual":" - ",
        "pstartdate":"2022-04-04T20:00:00.000Z",
        "penddate":"2022-06-24T20:00:00.000Z",
        "tasks_count":"0",
        "createdby":"4744",
        "taskpriority":0,
        "percentage":0
      },
      {
        "taskid":"395",
        "projectid":"271",
        "taskname":"M3",
        "taskdesc":null,
        "ownerid":null,
        "ownername":null,
        "ownerimage":"",
        "statusid":204,
        "statustext":"Backlog",
        "statusclass":"#6f8693",
        "planned":"Apr 10 - Jun 10",
        "actual":" - ",
        "pstartdate":"2022-04-09T20:00:00.000Z",
        "penddate":"2022-06-09T20:00:00.000Z",
        "tasks_count":"0",
        "createdby":"4744",
        "taskpriority":0,
        "percentage":0
      }
    ]
  }
]

const taskData= 
[
  {
    'milestone':
    [
      {
        'task':
        [
          {
             "taskid":"140",
             "projectid":"271",
             "taskname":"T1",
             "taskdesc":null,
             "ownerid":"8881",
             "ownername":"Ijaz Ul Haq Abdulhaq",
             "ownerimage":"",
             "statusid":201,
             "statustext":"Backlog",
             "statusclass":"#6f8693",
             "planned":"Apr 01 - May 20",
             "actual":" - ",
             "pstartdate":"2022-03-31T20:00:00.000Z",
             "penddate":"2022-05-19T20:00:00.000Z",
             "tasks_count":"0",
             "createdby":"4744",
             "taskpriority":null,
             "percentage":null
          },
          {
             "taskid":"143",
             "projectid":"271",
             "taskname":"T3",
             "taskdesc":null,
             "ownerid":null,
             "ownername":null,
             "ownerimage":"",
             "statusid":600,
             "statustext":"Backlog",
             "statusclass":"#6F8693",
             "planned":"Apr 10 - May 20",
             "actual":" - ",
             "pstartdate":"2022-04-09T20:00:00.000Z",
             "penddate":"2022-05-19T20:00:00.000Z",
             "tasks_count":"0",
             "createdby":"4744",
             "taskpriority":null,
             "percentage":null
          },
          {
             "taskid":"144",
             "projectid":"271",
             "taskname":"T4",
             "taskdesc":null,
             "ownerid":null,
             "ownername":null,
             "ownerimage":"",
             "statusid":600,
             "statustext":"Backlog",
             "statusclass":"#6F8693",
             "planned":"Apr 02 - May 24",
             "actual":" - ",
             "pstartdate":"2022-04-01T20:00:00.000Z",
             "penddate":"2022-05-23T20:00:00.000Z",
             "tasks_count":"0",
             "createdby":"4744",
             "taskpriority":null,
             "percentage":null
          },
          {
             "taskid":"142",
             "projectid":"271",
             "taskname":"T2",
             "taskdesc":null,
             "ownerid":null,
             "ownername":null,
             "ownerimage":"",
             "statusid":600,
             "statustext":"Backlog",
             "statusclass":"#6F8693",
             "planned":"Apr 04 - May 30",
             "actual":" - ",
             "pstartdate":"2022-04-03T20:00:00.000Z",
             "penddate":"2022-05-29T20:00:00.000Z"
          }
        ]     
      }
    ]
  }
]

// Workload API

WorkProject = 
[
  {
    'projectname': "Wireframe",
    "employee":
    [
      {
        "employeename": "John",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216", 
            "taskname": "T1",      
            "taskdesc": "DEMO",       
            "ownerid": "93",     
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Done",
            "statusclass": "#1FC875",  
            "planned": "Feb 01 - Feb 18",  
            "actual": "PMO PROJECT",
            "pstartdate": "2022-02-01T20:00:00.000Z",
            "penddate": "2022-02-17T20:00:00.000Z", 
            "priority": "Low",
            "taskpercentage": 20, 
            "milestonename": "Solution Design"
          },
          {
            "taskid": "130",       
            "projectid": "216",      
            "taskname": "new task",  
            "taskdesc": "new task desc",  
            "ownerid": "93",  
            "ownername": "Sachin Gharge",  
            "ownerimage": "",  
            "statusid": 600,   
            "statustext": "Backlog",  
            "statusclass": "#6F8693",   
            "planned": "Feb 18 - Feb 21",  
            "actual": "PMO PROJECT",   
            "pstartdate": "2022-02-18T12:11:06.208Z", 
            "penddate": "2022-02-21T04:00:00.000Z",  
            "priority": "Medium",  
            "taskpercentage": 10,  
            "milestonename": "Initiated"  
          },
          {
            "taskid": "131",
            "projectid": "216",
            "taskname": "demo task",
            "taskdesc": "demo ",
            "ownerid": "93",     
            "ownername": "Sachin Gharge",   
            "ownerimage": "",
            "statusid": 22, 
            "statustext": "In Progress",
            "statusclass": "#eeab53",
            "planned": "Feb 19 - Feb 22",     
            "actual": "PMO PROJECT", 
            "pstartdate": "2022-02-19T05:49:26.221Z",
            "penddate": "2022-02-21T20:00:00.000Z",
            "priority": "High",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          }
        ]
      },
      {
        "employeename": "Kurt Russell Andrew Garfield",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Done",
            "statusclass": "#1FC875",
            "planned": "Jan 12 - Jan 16",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-12T20:00:00.000Z",
            "penddate": "2021-01-16T20:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 20,
            "milestonename": "Solution Design"
          },
          {
            "taskid": "130",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Backlog",
            "statusclass": "#6F8693",
            "planned": "Jan 18 - Jan 23",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-18T12:11:06.208Z",
            "penddate": "2021-01-23T04:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          }
        ]
      },
      {
        "employeename": "Steve William",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "On Track",
            "statusclass": "#ffa502",
            "planned": "Jan 19 - May 16",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-19T20:00:00.000Z",
            "penddate": "2021-05-16T20:00:00.000Z",
            "priority": "High",
            "taskpercentage": 47,
            "milestonename": "Solution Design"
          },
          {
            "taskid": "130",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Approved",
            "statusclass": "#5352ed",
            "planned": "May 18 - May 31",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-18T12:11:06.208Z",
            "penddate": "2022-05-31T04:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 71,
            "milestonename": "Initiated"
          },
          {
            "taskid": "130",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Approved",
            "statusclass": "#5352ed",
            "planned": "Feb 25 - Mar 12",
            "actual": "PMO PROJECT",
            "pstartdate": "2022-02-25T12:11:06.208Z",
            "penddate": "2022-03-12T04:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 71,
            "milestonename": "Initiated"
          }
        ]
      },
    ]
  },
  {
    'projectname': "Visual Design",
    "employee":
    [
      {
        "employeename": "Tymal",
        'task':
        [
          {
            "taskid": "124",
            "projectid": "102",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Approved",
            "statusclass": "#38182F",
            "planned": "Feb 15 - Mar 14",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-02-15T20:00:00.000Z",
            "penddate": "2021-03-14T20:00:00.000Z",
            "priority": "High",
            "taskpercentage": 20,
            "milestonename": "Planning deadline"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "In Progress",
            "statusclass": "#61A4BC",
            "planned": "Mar 17 - Apr 20",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-03-17T12:11:06.208Z",
            "penddate": "2021-04-20T04:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task3",
            "taskdesc": "demo ",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 22,
            "statustext": "Backlog",
            "statusclass": "#1A132F",
            "planned": "May 20 - Aug 27",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-20T05:49:26.221Z",
            "penddate": "2021-08-27T20:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 40,
            "milestonename": "Communication"
          }
        ]
      },
      {
        "employeename": "Tymal Russell",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "93",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Done",
            "statusclass": "#716F81",
            "planned": "Feb 12 - May 12",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-02-12T20:00:00.000Z",
            "penddate": "2021-05-12T20:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 10,
            "milestonename": "Solution Design"
          },
          {
            "taskid": "110",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Backlog",
            "statusclass": "#B97A95",
            "planned": "May 18 - Oct 11",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-18T12:11:06.208Z",
            "penddate": "2021-10-11T04:00:00.000Z",
            "priority": "High",
            "taskpercentage": 51,
            "milestonename": "Initiated"
          }
        ]
      }
    ]
  },
]; 

WorkResource = 
[
  {
    "employeename": "John",
    "project":
    [
      {
        'projectname': "Wireframe Wireframe Wireframe",
        'task':
        [
          {
            "taskid": "130",
            "projectid": "216",
            "taskname": "new task",        
            "taskdesc": "new task desc",        
            "ownerid": "93",       
            "ownername": "Sachin Gharge",        
            "ownerimage": "",        
            "statusid": 600,        
            "statustext": "Backlog",        
            "statusclass": "#6F8693",     
            "planned": "Feb 18 - Feb 21",    
            "actual": "actaul",  
            "pstartdate": "2022-02-18T12:11:06.208Z",  
            "penddate": "2022-02-21T04:00:00.000Z",
            "priority": "Medium",    
            "taskpercentage": 10,    
            "milestonename": "Initiated"
          },
          {
            "taskid": "131",       
            "projectid": "216",        
            "taskname": "demo task",       
            "taskdesc": "demo ",      
            "ownerid": "93",       
            "ownername": "Sachin Gharge",       
            "ownerimage": "",       
            "statusid": 202,       
            "statustext": "In Progress",     
            "statusclass": "#eeab53",     
            "planned": "Feb 19 - Feb 22",  
            "actual": "actaul",     
            "pstartdate": "2022-02-19T05:49:26.221Z",   
            "penddate": "2022-02-21T20:00:00.000Z",     
            "priority": "High",    
            "taskpercentage": 10,     
            "milestonename": "Initiated"      
          },
          {
            "taskid": "129",   
            "projectid": "216",    
            "taskname": "demo task",    
            "taskdesc": "demo desc",   
            "ownerid": "113",   
            "ownername": "Atiq Rehman",   
            "ownerimage": "",   
            "statusid": 201,   
            "statustext": "Backlog",   
            "statusclass": "#6f8693",   
            "planned": "Feb 19 - Feb 23",
            "actual": "actaul",   
            "pstartdate": "2022-02-19T04:06:12.716Z",   
            "penddate": "2022-02-22T20:00:00.000Z",   
            "priority": "Low",  
            "taskpercentage": 20,   
            "milestonename": "Solution Design"   
          },
          {
            "taskid": "125",    
            "projectid": "216", 
            "taskname": "Create Solution design Architecture ",  
            "taskdesc": "asdasd",
            "ownerid": "127",  
            "ownername": "Kannan Parthasarathy",   
            "ownerimage": "", 
            "statusid": 203,  
            "statustext": "Done",   
            "statusclass": "#1FC875",   
            "planned": "Feb 16 - Feb 28",   
            "actual": "actaul",  
            "pstartdate": "2022-02-16T00:56:39.268Z",   
            "penddate": "2022-02-27T20:00:00.000Z",   
            "priority": "High",   
            "taskpercentage": null,   
            "milestonename": "Solution Design"
          }        
        ]
      },
      {
        'projectname': "Visual Design",
        'task':
        [
          {
            "taskid": "124",
            "projectid": "102",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Approved",
            "statusclass": "#38182F",
            "planned": "Feb 15 - Mar 14",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-02-15T20:00:00.000Z",
            "penddate": "2021-03-14T20:00:00.000Z",
            "priority": "High",
            "taskpercentage": 20,
            "milestonename": "Planning deadline"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "In Progress",
            "statusclass": "#61A4BC",
            "planned": "Mar 17 - Apr 20",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-03-17T12:11:06.208Z",
            "penddate": "2021-04-20T04:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task3",
            "taskdesc": "demo ",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 22,
            "statustext": "Backlog",
            "statusclass": "#1A132F",
            "planned": "May 20 - Aug 27",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-20T05:49:26.221Z",
            "penddate": "2021-08-27T20:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 40,
            "milestonename": "Communication"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task4",
            "taskdesc": "demo ",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 22,
            "statustext": "Planned",
            "statusclass": "#EA9E8D",
            "planned": "May 18 - May 27",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-18T05:49:26.221Z",
            "penddate": "2022-05-27T20:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 40,
            "milestonename": "Communication"
          }
        ]
      },
      {
        'projectname': "Graphic Design",
        'task':
        [
          {
            "taskid": "124",
            "projectid": "102",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Approved",
            "statusclass": "#a55eea",
            "planned": "Jan 15 - Mar 14",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-15T20:00:00.000Z",
            "penddate": "2021-03-14T20:00:00.000Z",
            "priority": "High",
            "taskpercentage": 20,
            "milestonename": "Planning deadline"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "In Progress",
            "statusclass": "#4b7bec",
            "planned": "Feb 17 - Apr 20",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-02-17T12:11:06.208Z",
            "penddate": "2021-04-20T04:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task3",
            "taskdesc": "demo ",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 22,
            "statustext": "Backlog",
            "statusclass": "#fc5c65",
            "planned": "Aug 20 - Aug 27",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-08-20T05:49:26.221Z",
            "penddate": "2021-08-27T20:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 40,
            "milestonename": "Communication"
          },
          {
            "taskid": "134",
            "projectid": "102",
            "taskname": "Task4",
            "taskdesc": "demo ",
            "ownerid": "55",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 22,
            "statustext": "Planned",
            "statusclass": "#fa8231",
            "planned": "Jan 18 - Jan 27",
            "actual": "PMO PROJECT",
            "pstartdate": "2022-01-18T05:49:26.221Z",
            "penddate": "2022-01-27T20:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 40,
            "milestonename": "Communication"
          }
        ]
      },
    ]
  },
  {
    "employeename": "Kurt Russell",
    "project":
    [
      {
        'projectname': "Wireframe",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Done",
            "statusclass": "#1FC875",
            "planned": "Jan 12 - Jan 16",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-12T20:00:00.000Z",
            "penddate": "2021-01-16T20:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 20,
            "milestonename": "Solution Design"
          },
          {
            "taskid": "130",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Sachin Gharge",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Backlog",
            "statusclass": "#6F8693",
            "planned": "Jan 18 - Jan 23",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-01-18T12:11:06.208Z",
            "penddate": "2021-01-23T04:00:00.000Z",
            "priority": "Medium",
            "taskpercentage": 10,
            "milestonename": "Initiated"
          }
        ]
      },
      {
        'projectname': "Visual Design",
        'task':
        [
          {
            "taskid": "127",
            "projectid": "216",
            "taskname": "Task1",
            "taskdesc": "DEMO",
            "ownerid": "93",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 23,
            "statustext": "Done",
            "statusclass": "#716F81",
            "planned": "Feb 12 - May 12",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-02-12T20:00:00.000Z",
            "penddate": "2021-05-12T20:00:00.000Z",
            "priority": "Low",
            "taskpercentage": 10,
            "milestonename": "Solution Design"
          },
          {
            "taskid": "110",
            "projectid": "216",
            "taskname": "Task2",
            "taskdesc": "new task desc",
            "ownerid": "93",
            "ownername": "Abul Qais",
            "ownerimage": "",
            "statusid": 600,
            "statustext": "Backlog",
            "statusclass": "#B97A95",
            "planned": "May 18 - Oct 11",
            "actual": "PMO PROJECT",
            "pstartdate": "2021-05-18T12:11:06.208Z",
            "penddate": "2021-10-11T04:00:00.000Z",
            "priority": "High",
            "taskpercentage": 51,
            "milestonename": "Initiated"
          }
        ]
      },
    ]
  }
]
