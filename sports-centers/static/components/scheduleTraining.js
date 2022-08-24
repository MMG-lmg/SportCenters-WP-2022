Vue.component("scheduleTraining",{
    data:function(){
        return{
            training:null,
            customer:null,
            feedback:null,
        }
    },
    template:`
        <div>
            <h3>Zakazivanje treninga</h3>
            <p>{{feedback}}</p>
            <div>
                <label for="title">Naziv:</label>
                <input type="text" name="title" v-model="training.title" disabled/>
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
                customer = response.data;
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

    }
})