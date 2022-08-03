Vue.component("center",{
    data: function(){
        return{
            center:null,
            error:"",
            addNew:0,
            newTraining:{trainingId:"",title:"",centerId:"",durationMins:0,coachId:"",description:"",imagePath:""}
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
            <button v-on:click="flipAddFlag">Dodavanje novog treninga</button>
            <div v-if="addNew">
                <label for="title">Naziv treninga</label>
                <input type="text" name="title" v-model="newTraining.title"></input>
                <br>
                <label for="logo">Logo sporskog centra </label>
                <input type="file" name="logo" ref="imgUpload" @change="onFileInput($event)"></input>
                <button @click="removeImage">Ukloni logo</button>
                <img :src="imagePath"></img>
                <br>
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
                if(this.$router.app.login!="ADMIN" || this.$router.app.login!="MENAGER"){
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
            }
            else{
                console.log("else");
                this.error="menadzer nema sportski centar";
            }
           
        })
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
                this.imagePath = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(){
            this.imagePath="";
            this.$refs.imgUpload.value = null;
        }
    }
});