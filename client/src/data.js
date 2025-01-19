import Thumbnail1 from './assets/flag1.jpg'
import Thumbnail2 from './assets/flag2.jpg'
import Thumbnail3 from './assets/flag3.png'
import Candidate1 from  './assets/candidate1.jpg'
import Candidate2 from  './assets/candidate2.jpg'
import Candidate3 from  './assets/candidate3.jpg'
import Candidate4 from  './assets/candidate4.jpg'
import Candidate5 from  './assets/candidate5.jpg'
import Candidate6 from  './assets/candidate6.jpg'
import Candidate7 from  './assets/candidate7.jpg'



export const elections =[
    {
        id:"e1",
        title:"Masinde muliro Presindetial lection 2025",
        description:`An election at MMUST (Masinde Muliro University of Science and Technology) is a democratic process where students, faculty, or staff vote to elect representatives for various leadership roles within the university. These elections foster accountability, inclusivity, and student engagement in governance, ensuring that the voices of the university community are heard and represented in decision-making processes`,
        thumbnail:Thumbnail1 ,
        candidates:["c1","c2","c3","c4"],
        voters:[]
    },
    {
        id:"e2",
        title:"Masinde muliro Presindetial lection 2025",
        description:`An election at MMUST (Masinde Muliro University of Science and Technology) is a democratic process where students, faculty, or staff vote to elect representatives for various leadership roles within the university. These elections foster accountability, inclusivity, and student engagement in governance, ensuring that the voices of the university community are heard and represented in decision-making processes`,
        thumbnail:Thumbnail2,
        candidates:["c5","c6","c7","c8"],
        voters:[]
    },
    {
        id:"e3",
        title:"Masinde muliro Presindetial lection 2025",
        description:`An election at MMUST (Masinde Muliro University of Science and Technology) is a democratic process where students, faculty, or staff vote to elect representatives for various leadership roles within the university. These elections foster accountability, inclusivity, and student engagement in governance, ensuring that the voices of the university community are heard and represented in decision-making processes`,
        thumbnail:Thumbnail3,
        candidates:[],
        voters:[]
    },
]

export const candidates =[
    {
        id:"c1",
        fullName:"Kevin vidolo",
        image:Candidate1,
        Motto:"Coding will make me mad",
        voteCount:23,
        election:"e1"
    },
    {
        id:"c2",
        fullName:"Amos Wasiali",
        image:Candidate2,
        Motto:"Mad man in the house ",
        voteCount:16,
        election:"e1"
    },
    {
        id:"c3",
        fullName:"kwamboka lucy",
        image:Candidate3,
        Motto:"Chop rice chop rice ",
        voteCount:25,
        election:"e2"
    },
    {
        id:"c4",
        fullName:"John Doe",
        image:Candidate4,
        Motto:"the unkonw stranger in programming",
        voteCount:99,
        election:"e1"
    },
    {
        id:"c5",
        fullName:"Stephanie Sussy",
        image:Candidate5,
        Motto:"tommorrow is another day",
        voteCount:238,
        election:"e2"
    },
    {
        id:"c6",
        fullName:"Boaz opiyo",
        image:Candidate6,
        Motto:"nothing but drama",
        voteCount:42,
        election:"e2"
    },
    {
        id:"c7",
        fullName:"Dan Kiyeng",
        image:Candidate7,
        Motto:"The coder will win",
        voteCount:23,
        election:"e2"
    },
]

export const Voters =[
    {
        id:"v1",
        fullName:"Juma Onyango",
        email:"onyangojuma984@gmail.com",
        password:"9563-Juma",
        isAdmin:true,
        VotedElection :["e2"]
    },
    {
        id:"v1",
        fullName:"Juma Onyango",
        email:"onyangojuma984@gmail.com",
        password:"9563-Juma",
        isAdmin:true,
        VotedElection :["e2"]
    },
    {
        id:"v2",
        fullName:"Kevin Vidolo",
        email:"kevinvidolo@gmail.com",
        password:"123456789",
        isAdmin:false,
        VotedElection :["e2","e2"]
    },
    {
        id:"v3",
        fullName:"Omar Kasera",
        email:"omarkasera@gmail.com",
        password:"123456789",
        isAdmin:false,
        VotedElection :["e2"]
    },
    {
        id:"v4",
        fullName:"samrato",
        email:"samratadeactivator@gmail.com",
        password:"9563-Juma",
        isAdmin:true,
        VotedElection :[]
    },
]