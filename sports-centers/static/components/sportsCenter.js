Vue.component("center",{
    data: function(){
        return{
            center:null,
            error:"",
            addNew:0,
            coaches:null,
            image:null,
            newTraining:{trainingId:"",title:"",type:"PERSONAL",centerId:"",durationMins:0,coachId:"",description:"",imagePath:""},
            trainigsList:null
        }
    },
    template:`
    <div>
        <p>{{error}}</p>
        <div v-if="center">
            <h3>{{center.centerTitle}}</h3>
            <img v-bind:src="'data:image/png;base64,' + center.logoPath" width="50" height="60"/>
            <p>Naziv: {{center.centerTitle}}</p>
            <p>Tip: {{typeToString(center.type)}}</p>
            <p>Status: {{center.status}}</p>
            <p>Adresa: {{locationToString(center.location)}}
            <p>Prosecna ocena: {{center.grade}}</p>
            <p>Radno vreme: {{workHoursToString(center.workHours)}}</p>
            

            <table v-if="trainigsList">
                <tr>
                    <th>Slicica traninga</th>
                    <th>Opis treninga</th>
                    <th>Ime trenera</th>
                    <th>Cena treninga</th>
                </tr>
                <tr v-for="training in trainigsList">
                    <td><img v-bind:src="'data:image/png;base64,' + training.imagePath" width="70" height="80"/></td>
                    <td>{{training.description}}</td>
                    <td>{{training.coach.name}}</td>
                </tr>
            </table>
            
            <button  v-if="!addNew" v-on:click="flipAddFlag">Dodavanje novog treninga</button>
            <button  v-if="addNew" v-on:click="cancelAdd">Odustani od dodavanja</button>

            <div v-if="addNew">
                <label for="title">Naziv treninga</label>
                <input type="text" name="title" v-model="newTraining.title"></input>
                <br>
                <label for="logo">Logo sporskog centra </label>
                <input type="file" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
                <button @click="removeImage">Ukloni logo</button>
                <img :src="image"></img>
                <br>
                <label for="type">Tip treninga:</label>
                <select ref="typeCombo" name="type" v-model="newTraining.type">
                    <option value="PERSONAL" selected>Personalni</option>
                    <option value="GROUP">Grupni</option>
                </select>
                <label for="duration">Trajanje treninga</label>
                <input type="number" name="duration" v-model="newTraining.durationMins"></input>
                <label for="coach">Trener</label>
                <select v-model="newTraining.coachId">
                    <option v-for="coach in coaches" :value="coach.userName">{{coach.userName}}:{{coach.name}}</option>
                </select>
                <label for="description">Opis treninga</label>
                <textarea  name="description" v-model="newTraining.description" rows="5" cols="40"></textarea>
                <button v-on:click="addTraining"> Dodaj </button>
            </div>
        </div>

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
                if(this.$router.app.login!="MENAGER"){
                    router.push(`/403`);
                }
            }
        });

        axios.get("rest/centers/view",{
            params:{
                menager: String(this.$router.app.username)
            }
        })
        .then(response=>{
            console.log(response.data);
            if(response.data!="FAILIURE"){
                this.center = response.data;
                axios.get('rest/getTrainingsForCenter',{
                    params:{
                        centerId: this.center.centerId,
                    }
                })
                .then(
                    response=>{
                       this.trainigsList=response.data;
                    }
                )
            }
            else{
                console.log("else");
                this.error="menadzer nema sportski centar";
            }
           
        });
        axios.get('rest/getCoaches').then(response=>{
            if(response.data != null){
                this.coaches = response.data;
            }
        });
        
        
    },
    methods:{
        typeToString: function(type){
            switch(type){
                case "GYM":
                    return "Teretana";
                case "POOL":
                    return "Bazen";
                case "DANCE_STUDIO":
                    return "Plesni studio";
                default:
                    return "Sportski centar";
            }
        },
        locationToString: function(sc){
            return sc.latitude +","+ sc.longitude +"\n"
			+sc.address.street +","+ sc.address.streetNumber +"\n"
			+sc.address.city;
        },
        workHoursToString: function(hours){
            return hours[0] +" : "+ hours[1];
        },
        flipAddFlag: function(){
            this.addNew=!this.addNew;
        },
        cancelAdd:function(){
            this.newTraining = {trainingId:"",title:"",centerId:"",durationMins:0,coachId:"",description:"",imagePath:""};
            this.addNew = 0;
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
        },
        addTraining: function(){
            this.newTraining.centerId = this.center.centerId;
            this.newTraining.imagePath = this.image.split(",")[1];
            axios.post("rest/addTraining",this.newTraining).then(
                res=>{
                    if(res.data==="FAILIURE"){
                        this.error="Dodavanja treninga, neuspesno!";
                    }
                    else{
                        this.error="Uspesna izmena i dodavanja povratak na pocetnu";
                        setTimeout(() => {  router.push(`/`) }, 5000);
                    }
                    
                }
            )
        },
        trainingTypeToString: function(type){
            switch(type){
                case "GROUP":
                    return "Grupni trening";
                case "PERSONAL":
                    return "Personalni trening";
            }
        },
    }
});