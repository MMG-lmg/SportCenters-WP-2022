Vue.component("login",{
    data: function(){
        return {
            credentials: {username:"",password:""},
            error:""
        }
    },
    template:`
        <div>
            <h3>Prijava</h3>
            <form>
                <label for="username">Korisnicko ime:</label><br>
                <input type="text" v-model="credentials.username" name="username"><br>
                <label for="password">Lozinka:</label><br>
                <input type="password" v-model="credentials.password" name="password">
                <button v-on:click="login">Prijava</button>
            </form>
            <p>{{error}}</p>
        </div>
    `,
    mounted() {
        
    },
    methods:{
        login: function(event){
            event.preventDefault();
            console.log(this.credentials.username +","+ this.credentials.password);
            if(this.credentials.username.trim() != "" && this.credentials.password.trim() != ""){
                axios.post("rest/login", this.credentials)
                .then(res => {
                    if(res.data ==="FAILIURE"){
                        this.error ="Korisnicko ime ili lozinka nisu ispravni.";
                    }
                    else{
                        this.storeData(userType = res.data.split(",")[1]);
                        router.push(`/`);
                    }
                });
            }
            else{
                this.error ="Potrebno je popuniti oba polja";
            }
            
        },
        storeData: function(userType){
            this.$router.app.login=userType;
            this.$router.app.username=this.credentials.username;
        }
    }
});
