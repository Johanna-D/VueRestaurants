<template>
  <div id="base">
    <div id="ColonneGauche">
      <div id="AjouterRestaurant" v-if="modifierResto == false">
        <h1>Ajouter un restaurant</h1>
        <form @submit.prevent="ajouterRestaurant($event)">
          <p>
            <label>
              Nom : <input name="nom" type="text" required v-model="nom" />
            </label>
          </p>
          <p>
            <label>
              Cuisine :
              <input name="cuisine" type="text" required v-model="cuisine" />
            </label>
          </p>

          <p><button>Ajouter</button></p>
        </form>
      </div>

      <div id="ModifierRestaurant" v-if="modifierResto == true">
        <h1>Modifier un restaurant</h1>
        <form @submit.prevent="modifierRestaurant($event)">
          <p>
            <label>
              ID :
              <input name="_id" type="text" :value="idCible"  />
            </label>
          </p>
          <p>
            <label>
              Nom :
              <input name="nom" type="text" :value="nomCible"  />
            </label>
          </p>
          <p>
            <label>
              Cuisine :
              <input
                name="cuisine"
                type="text"
                :value="cuisineCible"
                
              />
            </label>
          </p>
          <p><button @click="switchDiv()" >Modifier</button></p>
        </form>
      </div>

      <div id="Informations">
        <h1>Informations</h1>
        <p>Nombre de restaurants : {{ nbRestaurantsTotal }}</p>
        <p></p>
        <p>Nombre total de pages : {{ nbPagesTotal }}</p>
        <p>
          Nombre de restaurants par page :
          <input
            @input="getRestaurantsFromServer()"
            type="range"
            min="2"
            max="1000"
            v-model="pagesize"
          />{{ pagesize }}
        </p>
        <p>
          Chercher un restaurant par nom :
          <input
            @input="chercherRestaurants()"
            type="text"
            v-model="nomRestauRecherche"
          />
        </p>
      </div>
    </div>

    <div id="Tableau">
      <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Liste des restaurants</h1>
          </div>
          <md-button :disabled="page === 0" @click="pagePrecedente()"
            >Précédent</md-button
          >&nbsp;&nbsp;
          <md-button :disabled="page === nbPagesTotal" @click="pageSuivante()"
            >Suivant</md-button
          >
          &nbsp; Page courante : {{ page }}
        </md-table-toolbar>
        <md-table-empty-state
          md-label="Aucun résultat"
          :md-description="'Aucun restaurant ne correspond à votre recherche'"
        >
        </md-table-empty-state>

        <!-- à rajouter dans md table row ensuite : @click="supprimerRestaurant(item)" -->
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
            item.cuisine
          }}</md-table-cell>
          <md-table-cell md-label="Ville" md-sort-by="borough">{{
            item.borough
          }}</md-table-cell>
          <md-table-cell md-label="Détails"
            ><router-link :to="'/restaurant/' + item._id"
              ><md-icon>description</md-icon></router-link
            ></md-table-cell
          >
          <md-table-cell 
            ><md-button @click="modifierResto = true, idCible= item._id, nomCible= item.name, cuisineCible= item.cuisine"><md-icon>create</md-icon></md-button>
            <md-button @click="supprimerRestaurant(item)"><md-icon>delete_outline</md-icon></md-button> 
              
            </md-table-cell
          >
          
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      modifierResto: false,
      idCible: "",
      nomCible: "",
      cuisineCible: "",
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          // arrow functions, conserve le bon "this"
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getRestaurantsFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
    },
    modifierRestaurant(event) {
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;
      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(event.target);

      let id = form._id.value; // on peut aller chercher la valeur
      // d'un champs d'un formulaire
      // comme cela, si on connait le nom
      // du champ (valeur de son attribut name)
      console.log(id);
      let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then((responseJSON) =>{
        responseJSON.json()
            .then((resJS) =>{
                // Maintenant res est un vrai objet JavaScript
                console.log(resJS.msg);
            this.msg = resJS.msg;
                this.getRestaurantsFromServer();
            });
        })
        .catch(function (err) {
            console.log(err);
    });
    this.idCible = "";
    this.nomCible = "";
    this.cuisineCible = "";
    },
    switchDiv() {
      setTimeout(this.passeraAjouterResto, 1000);
    },
    passeraAjouterResto(){
      this.modifierResto = false;
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
template {
  width: 100%;
  height: 100%;
}
#base{
  width: 100%;
  height: 100%;
  margin-top: 3%;
}
#Tableau {
  width: 70%;
  /*margin: 0 auto;*/
  margin-left: 23%;
  box-shadow: 0px 0px 12px #414141;
  height: 90%;
  overflow-x: auto;
  overflow-y: auto;
  
}
#AjouterRestaurant,
#Informations,
#ModifierRestaurant {
 
  margin: 10%;
  /*display: inline-block;*/
  vertical-align: top;
  background-color: white;
  padding: 10px;
  box-shadow: 0px 0px 12px #414141;
  overflow-x: auto;
  overflow-y: auto;
}
#Informations {
  margin-top: 30px;
}

#ColonneGauche {
  position: fixed;
  width: 23%
}
</style>
