
const AgriData = [
    {
        question:'Give one chemical property of soil',
        answers:[
            {text:'Porosity' , id:1, correct:false},
            {text:'PH' ,id:2, correct:true},
            {text:'Depth' , id:3,correct:false},
            {text:'Colour',id:4, correct:false}
        ]

    }, 
    {
        question:'The following options affect soil temperature except',
        answers:[
            {text:'Soil colour', correct:false},
            {text:'Vegetative cover', correct:false},
            {text:'Slope of the land', correct:false},
            {text:'Seed germination', correct:true}
        ]
    },
    {
        question:'State any one method of controlling weeds',
        answers:[
            {text:'Physical' , correct:true},
            {text:'Burning', correct:false},
            {text:'Slashing', correct:false},
            {text:'Hoeing', correct:false}
        ]
    },
    {
    question:'Concetrates are feeds with',
    answers:[
        {text:'High fibre content' , correct:false},
        {text:'High protein content', correct:true},
        {text:'Low protein content', correct:false},
        {text:'High moisture content', correct:false}
    ]
},
{
    question:'Give one factor that can not be considered when feeding animals',
    answers:[
        {text:'Age of animal' , correct:false},
        {text:'Type of animal', correct:false},
        {text:'Texture of feed', correct:false},
        {text:'Colour of feed', correct:true}
    ]
},
{
    question:'Equilibrium is a point whereby',
    answers:[
        {text:'Quantity demanded is equal to quantity supplied' , correct:true},
        {text:'Quantity demanded is higher than quantity supplied', correct:false},
        {text:'Quantity supplied is higher than quantity demanded', correct:false},
        {text:'Quantity supplied is less than quantity denanded', correct:false}
    ]
},
{
    question:'Give one type of farm record',
    answers:[
        {text:'Animal record' , correct:false},
        {text:'Crop record', correct:false},
        {text:'Chicken record', correct:false},
        {text:'Crop production record', correct:true}
    ]
},
{
    question:'Farming resources are _______ apart from',
    answers:[
        {text:'Labour' , correct:false},
        {text:'Capital', correct:false},
        {text:'Soil', correct:true},
        {text:'Management skills', correct:false}
    ]
},
{
    question:'What is the use of a harrow as a farm equipment',
    answers:[
        {text:'Weeding' , correct:false},
        {text:'Tilling', correct:false},
        {text:'Breaking down the clods', correct:true},
        {text:'Ploughing', correct:false}
    ]
},
{
    question:'Outline 2 drought resistant crops grown in malawi',
    answers:[
        {text:'Cassava and Maize' , correct:false},
        {text:'Cassava and Banana', correct:false},
        {text:'Maize and Yams', correct:false},
        {text:'Cassava and Yams', correct:true}
    ]
},
{
    question:'',
    answers:[
        {text:'' , correct:false},
        {text:'', correct:true},
        {text:'', correct:false},
        {text:'', correct:false}
    ]
},

 
   

];
const AgriLessonsData = [
    {
        id:0,
        form:'form 3',
        title:'Natural Resources',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
    {
        id:1,
        form:'form 3',
        title:'Soil Erosion',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    },
    {
        id:2,
        form:'form 4',
        title:'Soil Degradation',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
        id:3,
        form:'form 3',
        title:'Livestock Management',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:4,
        title:'Chicken Production',
        form:'form 2',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:5,
        form:'form 1',
        title:'Vegetable Production',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:6,
        form:'form 1',
        title:'Market Functions',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:7,
        form:'form 3',
        title:'Properties Of Soil',
        description:'TLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:8,
        form:'form 2',
        title:'Pig Production',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id:9,
        form:'form 1',
        title:'Land Preparation',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }


]

export {
   AgriData,
    AgriLessonsData

} 