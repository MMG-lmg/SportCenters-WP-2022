Vue.component("scheduleTraining",{
    data:function(){
        return{
            training:{trainingId:"",title:"",type:"",center:null,durationMins:0,coach:null,description:"",imagePath:""},
            customer:null,
            feedback:null,
            dateTime:null
        }
    },
    template:`
        <div>
            <h3>Zakazivanje treninga</h3>
            <p>{{feedback}}</p>
            <div>
                <label for="title">Naziv:</label>
                <input type="text" name="title" v-model="training.title" disabled/>
                <label for="desc">Naziv:</label>
                <input type="text" name="desc" v-model="training.description" disabled/>
                <label for="duration">Trajanje u minutama:</label>
                <input type="text" name="duration" v-model="training.durationMins" disabled/>
                <label for="date">Zeljeni datum treninga:</label>
                <input type="datetime-local" name="date" v-model="dateTime"/>
                <button v-if="dateTime" @click="scheduleTraining">Zakazi</button>
            </div>
        </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				console.log(response.data);
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="CUSTOMER"){
                    router.push(`/403`);
                }  
                this.customer = response.data;
            }
        });
        axios.get('rest/getTraining',{
            params:{
                trainingId: String(this.$route.params.trainingId)
            }
        })
        .then(response=>{
            if(response.data!="FAILIURE"){
                this.training = response.data;
            }
            else{
                this.feedback = "Greska ne postoji taj trenining";
            }
           
        });
    },
    methods:{
        scheduleTraining: function(){
            var trainingHistory = {historyId:"",date:this.dateTime,trainingId:this.training.trainingId,customerId:this.customer.userName,coachId:this.training.coach.userName};
            axios.post("rest/addTrainingHistory",trainingHistory)
            .then(res =>{
                if(res.data === "FAILIURE"){
                    this.feedback = "Greska upis nije uspeo";
                }
                else{
                    this.feedback = "Trening uspesno zakazan, povratak na pocetnu";
                    setTimeout(() => {  router.push(`/`) }, 1500);
                }
            });
        }
    }
})