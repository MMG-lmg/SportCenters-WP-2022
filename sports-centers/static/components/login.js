Vue.component("login",{
    data: function(){
        return {
            credentials: {username:"",password:""},
            error:""
        }
    },
    template:`
        <div>
            <div class="d-flex flex-column align-items-center justify-content-center mt-5">
                <h3>Prijava</h3>
                <form>
                    <div class=" input-group mt-2">	
						<span class="input-group-text">Korisnicko ime:</span>
						<input class="form-control" ref="titleField" type="text" v-model="credentials.username" name="username"></input>
                    </div>
                    <div class=" input-group mt-2">	
						<span class="input-group-text">Lozinka:</span>
						<input class="form-control" ref="titleField" type="password" v-model="credentials.password" name="password"></input>
                    </div>
                    <button class="btn btn-primary button-green mt-2" v-on:click="login">Prijava</button>
                </form>
                <div v-if="error" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <p>{{error}}</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
    `,
    mounted() {
    },
    methods:{
        login: function(event){
            event.preventDefault();
            //console.log(this.credentials.username +","+ this.credentials.password);
            if(this.credentials.username.trim() != "" && this.credentials.password.trim() != ""){
                axios.post("rest/login", this.credentials)
                .then(res => {
                    if(res.data ==="FAILIURE"){
                        this.error ="Korisnicko ime ili lozinka nisu ispravni.";
                        setTimeout(() => {  this.error="" }, 5000);
                    }
                    else{
                        router.push(`/`);
                    }
                });
            }
            else{
                this.error ="Potrebno je popuniti oba polja";
                setTimeout(() => {  this.error="" }, 5000);
            }
            
        },
        storeData: function(userType){
            this.$router.app.login=userType;
            this.$router.app.username=this.credentials.username;
        }
    }
});
