Vue.component("addCenter",{
    data:function(){
        return{
            centerTitle:"",
            type:"",
            image:null,
            workHoursStart:null,
            workHoursEnd:null,
            street :"",
            streetNumber :"",
            city :"",
            zipCode :"",
            latitude:0,
            longitude:0,
            error:"",
            selectedManager:null,
            freeManagers:null,
            manager:{userName:"",password:"",name:"",gender:"",dateOfBirth:"",role:"MENAGER",SportCenterTitle:""},
            passwordCheck:""
        }
    },
    template:`
    <div>
        <h3>Unos novog spotskog centra</h3>
        <p>{{error}}</p>
        <label for="title">Naziv sportskog centra</label>
        <input type="text" name="title" v-model="centerTitle"></input>
        <br>
        <label for="type">Tip</label> 
        <select name="type" v-model="type">
            <option value="SPORTS_CENTER">Sportski centar</option>
            <option value="GYM">Teretana</option>
            <option value="POOL">Bazen</option>
            <option value="DANCE_STUDIO">Plesni studio</option>
        </select>
        <br>
        <label for="logo">Logo sporskog centra </label>
        <input type="file" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
        <button @click="removeImage">Ukloni logo</button>
        <img :src="image"></img>
        <br>
        <label for="timeStart">Radno vreme</label>
        <input type="number" name="timeStart" min="0" max="24" v-model="workHoursStart"></input>
        
        <input type="number" name="timeEnd" min="0" max="24" v-model="workHoursEnd"></input>

        <p>Adresa</p>
        <p>Koordinate</p>
        <input type="number" v-model="latitude"></input>
        <input type="number" v-model="longitude"></input>
        <br>
        <label for="street">Ulica</label>
        <input type="text" name="street" v-model="street"></input>

        <label for="sNumber">Broj</label>
        <input type="text" name="sNumber" v-model="streetNumber"></input>

        <label for="city">Grad</label>
        <input type="text" name="city" v-model="city"></input>

        <label for="zip">Postanski broj</label>
        <input type="number" name="zip" v-model="zipCode"></input>

        <div v-if="freeManagers">
            <label for="manager">Menadzer:</label>
            <select v-model="selectedManager">
                <option v-for="manager in freeManagers" :value="manager">{{manager.userName}}:{{manager.name}}</option>
            </select>
        </div>

        <div v-if="!freeManagers">
        <label for="username">Korisnicko ime:</label><br>
        <input type="text" v-model="manager.userName" name="username"><br>

        <label for="name">Ime:</label><br>
        <input type="text" v-model="manager.name" name="name"><br>

        <label for="password">Lozinka:</label><br>
        <input type="password" v-model="manager.password" name="password"><br>

        <label for="passwordCheck">Ponoviti lozinku:</label><br>
        <input type="password" v-model="passwordCheck" name="passwordCheck"><br>

        <label for="gender">Pol:</label><br>
        <select ref="genderCombo" v-model="manager.gender" name="gender">
                <option value="MALE" selected>Muski</option>
                <option value="FEMALE">Zenski</option>
        </select><br>
        
        <label for="date">Datum rodjenja:</label><br>
        <input type="date" v-model="manager.dateOfBirth" name="date"><br>
        </div>

        <button v-if="checkData" @click="addCenter">Dodaj centar</button>
    </div>
    `,
    mounted(){
        axios.get('rest/loginCheck').then(response=>{
            if(response.data == null){
                router.push(`/403`);
            }
            else{
				this.$router.app.username = response.data.userName;
                this.$router.app.login = response.data.role;
                if(this.$router.app.login!="ADMIN"){
                    router.push(`/403`);
                }
            }
        });
        axios.get("rest/getFreeManagers")
        .then(response=>{
            this.freeManagers = response.data;
        });
    },
    methods:{
        canAddCenter: function(){
            console.log("can add center");
            if(!this.freeManagers){
                if(this.checkManager()){
                    this.addManager();
                    this.manager.SportCenterTitle = this.centerTitle;
                    this.selectedManager = this.manager;
                    return true;
                }
                else{
                    this.error="Polja menadzera nisu popunjena sva";
                    return false;
                }
                
            }
            else{
                console.log("free managers true");
                if(this.selectedManager){
                    console.log("WAAAAA");
                    this.selectedManager.SportCenterTitle = this.centerTitle;
                    return true;
                }
            }
            return false;
        },
        addCenter: function(){
            if(this.canAddCenter()){
                console.log("can add center : true");
                if(this.checkData()){
                    var SportsCenter = {centerId: 0, centerTitle: this.centerTitle, type: this.type, status:"CLOSED",
                    location:{ latitude: this.latitude, longitude: this.longitude, address: {street: this.street, streetNumber: this.streetNumber, city:this.city, zipCode:this.zipCode}},
                    logoPath: this.image.split(",")[1], grade: 0, workHours:[this.workHoursStart, this.workHoursEnd]
                    };
                    console.log(SportsCenter);
                    axios.post("rest/centers/add", SportsCenter)
                    .then(res=>{
                        if(res.data==="FAILIURE"){
                            this.error="Greska dodavanje centra, neuspesno!";
                        }
                        else{
                            this.error="Centar uspesno dodat";
                            console.log("Centar uspesno dodat");
                        }
                    });
                    console.log(this.selectedManager);
                    axios.post("rest/editManager",this.selectedManager).then(
                        res=>{
                            if(res.data==="FAILIURE"){
                                this.error="Izmena menadzera, neuspesno!";
                            }
                            else{
                                this.error="Uspesna izmena i dodavanja povratak na pocetnu";
                                setTimeout(() => {  router.push(`/`) }, 5000);
                            }
                            
                        }
                    );
                   
                }
                else{
                    this.error="Sva polja moraju biti popunjena";
                }
            }
        },
        checkData: function(){
            if(this.centerTitle===null || this.centerTitle==="" || 
                this.type===null || this.type==="" || 
                this.image===null || this.image==="" || 
                this.workHoursStart===null || this.workHoursStart==="" || 
                this.workHoursEnd===null || this.workHoursEnd==="" || 
                this.centerTitle===null || this.centerTitle==="" || 
                this.streetNumber===null || this.streetNumber==="" || 
                this.street===null || this.street==="" || 
                this.city===null || this.city==="" || 
                this.zipCode===null || this.zipCode==="" || 
                this.latitude===null || this.latitude===0 || 
                this.longitude===null || this.longitude===0)
            {
                return false;
            }
            else{
                return true;
            }
        },
        checkManager: function(){
            if(this.manager.userName===null || this.manager.userName==="" || 
            this.manager.password===null || this.manager.password==="" || 
            this.passwordCheck===null || this.passwordCheck==="" || 
            this.manager.name===null || this.manager.name==="" || 
            this.manager.gender===null || this.manager.gender==="" || 
            this.manager.dateOfBirth===null){}
            else{
                if(this.passwordCheck === this.manager.password){
                    return true;
                }
                this.error="Lozinke se moraju poklapati";
            }
            return false;
        },
        addManager:function(){
            axios.post("rest/addManager", this.manager)
            .then(res =>{
                if(res.data ==="FAILIURE"){
                }
                else{
                    this.error="Manadzer dodat";
                }
            });
        },
        onFileInput: function(e){
            var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            var files = e.target.files;
            if(!files.length){
                return;
            }
            var fileExtension = (files[0].name).match(patternFileExtension)[1];
            if(fileExtension=="png" || fileExtension=="jpg" || fileExtension=="jpeg" || fileExtension=="gif"){
                this.createImage(files[0]);
            }
            else{
                alert("odabrani file mora biti slika");
                this.removeImage();
            }
        },
        createImage: function(file){
            var reader = new FileReader();

            reader.onload = (e) =>{
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(){
            this.image="";
            this.$refs.imgUpload.value = null;
        }
    }
});