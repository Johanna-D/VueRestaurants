<template>
<div>
  <div id="base">
 
    <div id="navigation">
      <router-link :to="{name:'Panier', params: {articles: dataPanier}} ">
      <md-button class="md-icon-button">
        <md-icon>shopping_cart</md-icon>
      </md-button>
      </router-link>
    </div>
    
    <!--
   <div id="Panier">

      <md-table >
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Panier</h1>
          </div>
        </md-table-toolbar>

        
        <md-table-row v-for="r of dataPanier" :key="r">

          <md-table-cell md-label="nom" >
            {{r[0]}}
          </md-table-cell>
          <md-table-cell md-label="prix" >
            {{r[1]}}
          </md-table-cell>
          <md-table-cell md-label="annuler" >
            <md-button @click="supprimerArticle(r)"><md-icon>delete_outline</md-icon></md-button>
          </md-table-cell>
          
        </md-table-row>
      </md-table>

      <p>Total : {{totalPanier}} € </p>
      <router-link :to="'/commande' "><md-button>Commander</md-button></router-link
            >
    
     

   </div>-->

   
    <div id="menu">
        <h1>Menu du jour</h1>
        <h2>Menu du midi</h2>

          <p>Le menu du midi comprend une entrée, un plat et un dessert. <br>
          Pour l'achat d'un menu du midi, une boisson vous est offerte.<br>

          <p>Aujourdhui, le restaurant vous propose :<br>
          <md-list>
            <md-list-item>          
              <span class="md-list-item-text">En entrée : {{midiEntree[0]}}</span>
            </md-list-item>
            <md-list-item>          
              <span class="md-list-item-text">En plat : {{midiPlat[0]}}</span>
            </md-list-item>
            <md-list-item>          
              <span class="md-list-item-text">En dessert : {{ midiDessert[0] }}</span>
            </md-list-item>
          </md-list>
          Le tout pour {{priceMidi()}}€ <br>
          
          <md-button @click="ajouterPanier('Menu du midi', priceMidi())">Ajouter au panier</md-button>
          
          
          </p>

        <h2>Menu gastronomique</h2>

        <p>Envie de variété ?<br>
        Le menu gastronomique vous propose un ensemble de deux entrées, un plat et deux desserts afin de ravir vos papilles.<br>

          <p>Aujourdhui, le restaurant vous propose :<br>
          <md-list>
            <md-list-item>          
              <span class="md-list-item-text">En entrée : {{gastroEntree1[0]}} et {{gastroEntree2[0]}} </span>
            </md-list-item>
            <md-list-item>          
              <span class="md-list-item-text">En plat : {{gastroPlat[0]}}</span>
            </md-list-item>
            <md-list-item>          
              <span class="md-list-item-text">En dessert : {{gastroDessert1[0]}} et {{gastroDessert2[0]}}</span>
            </md-list-item>
          </md-list>
          Le tout pour {{priceGastro()}}€<br>
          
          <md-button @click="ajouterPanier('Menu gastronomique', priceGastro())">Ajouter au panier</md-button></p>
        
   </div>
    <div id="carte">
      <h1>Carte du jour</h1>

      
      <h2>Hors d'oeuvre</h2>
      <p>
      <img
        :src="selectedEntree[3]"
        alt="Photo de l'entrée"
        style="max-height: 300px; max-width: 400px; border: 1px solid black"
      /><br>
      {{selectedEntree[0]}}<br>
      {{selectedEntree[1]}}<br>
      {{selectedEntree[2]}}€<br>

      <md-button @click="ajouterPanier(selectedEntree[0], selectedEntree[2])">Ajouter au panier</md-button>
      
      
      </p>

      
      <h2>Plat </h2>
      <p>
      <img
        :src="selectedPlat[3]"
        alt="Photo du plat"
        style="max-height: 300px; max-width: 400px; border: 1px solid black"
      /><br>
      
      {{selectedPlat[0]}}<br>
      {{selectedPlat[1]}}<br>
      {{selectedPlat[2]}}€<br>

      <md-button @click="ajouterPanier(selectedPlat[0], selectedPlat[2])">Ajouter au panier</md-button>
      </p>

      
      <h2>Dessert</h2>
      <p>
      <img
        :src="selectedDessert[3]"
        alt="Photo du dessert"
        style="max-height: 300px; max-width: 400px; border: 1px solid black"
      /><br>
      {{selectedDessert[0]}}<br>
      {{selectedDessert[1]}}<br>
      {{selectedDessert[2]}}€<br>

      <md-button @click="ajouterPanier(selectedDessert[0], selectedDessert[2])">Ajouter au panier</md-button>
      
      </p>

    </div>


  </div>
</div>
</template>

<script>

export default {
  name: "Menu",
  
  computed: {
  },
  data: function () {
    return {
      entree: [
        ["Carottes rapées aux citron vert", "Carottes fraîchement rapées avec leur zeste de citron vert biologique", 5, "https://img.cuisineaz.com/610x610/2013-12-20/i42349-carottes-rapees.jpg"],
        ["Saumon à la mousse de courgettes","Mousse de courgette enrobée d'un filet de saumon", 8, "https://i.pinimg.com/originals/48/8a/28/488a280baa4ba469c04ca242026903b9.jpg"],
        ["Blinis maison","Variété de galette fraîchement préparée sur place", 5, "https://cache.marieclaire.fr/data/photo/w1000_c17/cuisine/160/blinis.jpg"],
        ["Cake salé jambon olives","Cake moelleux en version salé, à base de jambon et d'olives", 6, "https://img-3.journaldesfemmes.fr/87P7tOHrAT_9qFnCWdzziDCNuX8=/800x600/smart/bb58e69d2891490eb1044d9414e8b2c3/recipe-jdf/10027203.jpg"],
        ["Velouté de champignons","Un délicieux velouté à base de champignon et de crème", 5, "https://cdn.pratico-pratiques.com/app/uploads/sites/3/2018/08/20193118/veloute-aux-champignons.jpeg"],
        ["Tarte tatin endives et chavignol","Tarte tatin salée à base d'endive et de fromage", 7, "https://www.recette247.com/wp-content/uploads/2018/05/Tarte-Tatin-d%E2%80%99endives-et-chavignol-au-thermomix-1.jpg"],
        ["Chèvre en feuilleté","Pâte feuilletée au fromage de chèvre", 8, "https://odelices.ouest-france.fr/images/recettes/feuillete-au-fromage-de-chevre.jpg"],
        ["Quiche tatin","Quiche façon tatin à base de pommes de terre, de lard et de fromage", 7, "https://i.pinimg.com/originals/9f/8d/46/9f8d46f322f441ae9ac4b5680cd20be7.jpg"],
        ["Tarte thon, tomate et moutarde","La tarte classique mais pas moins délicieuse au thon et à la tomate, le tout relevé par de la moutarde", 6, "https://img.cuisineaz.com/660x660/2016-04-28/i38962-tarte-thon-tomates-et-moutarde.jpg"],
        ["Verrine fraîcheur au carré frais","Verrine à base d'avocat, de saumon et de fromage frais", 7, "https://www.recettes.net/documents/upload/original/v/e/verrine-saumon-carrefrais-avocat-47984617-s.jpg"],
      ],
      plat: [
        ["Blanquette de veau", " Recette de cuisine traditionnelle française, à base de ragoût de viande de veau marinée, puis mijotée dans un court-bouillon de vin blanc, carotte, poireau, oignon, champignon de Paris, et bouquet garni, liée en sauce blanche à la crème et au beurre", 14, "https://assets.afcdn.com/recipe/20190529/93189_w1024h768c1cx2886cy4330.jpg"],
        ["Lasagne à la bolognaise","Couches alternées de pâtes, de fromage et d'une sauce tomate avec de la viande", 12, "https://i-reg.unimedias.fr/sites/art-de-vivre/files/styles/recipe/public/lasagnes-bolognaise_istock.jpg?auto=compress%2Cformat&crop=faces%2Cedges&cs=srgb&fit=crop&h=500&w=393"],
        ["Filet mignon","Pièce la plus tendre de la viande de porc", 17, "https://www.atelierdeschefs.com/media/recette-e5988-filet-mignon-de-porc-creme-a-la-moutarde-riz-basmati-et-poelee-de-champignons.jpg"],
        ["Sauté de veau au chorizo","Plat relevé à base de veau et de chorizo", 16, "https://recette.supertoinette.com/151231/m/saute-de-veau-au-chorizo.jpg"],
        ["Boeuf bourguignon"," Recette de cuisine d'estouffade de bœuf, traditionnelle de la cuisine bourguignonne, cuisinée au vin rouge de Bourgogne, avec une garniture de champignons, de petits oignons et de lardons", 15, "https://assets.afcdn.com/recipe/20131009/56293_w1024h768c1cx1872cy2808.webp"],
        ["Chili con carne","Ragoût de viande épicé originaire du sud des États-Unis accompagné de son riz", 13, "https://cdn1.charal.fr/wp-content/uploads/2020/03/Chili-con-carne-DSC_6658.jpg"],
        ["Crevettes au curry","Recette Tha¨landaise à base de crevette, de curry et de lait de coco, accompagné de son riz basmati ", 18, "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/239755.jpg"],
        ["Emincé de poulet aux épices et au miel","Poulet d'origine locale mariné aux épices et au miel", 14, "https://www.etal-des-epices.com/blog/wp-content/uploads/2014/12/%C3%A9minc%C3%A9-de-poulet-aux-quantres-%C3%A9pices.jpg"],
        ["Pavé de saumon sur son lit de poireaux","Pavé de saumon frais mariné au citron avec des poireaux", 18, "https://i2.wp.com/healthyclemsy.fr/wp-content/uploads/2017/10/SAUMON.jpg?fit=800%2C800&ssl=1"],
        ["Pâtes carbonara","Véritable recette à base d'oeuf, de parmesan et de guanciale", 13, "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F07.2F30.2F31ab8e8b-93f4-46ba-9b3f-d17a050e9d30.2Ejpeg/850x478/quality/90/crop-from/center/spaghettis-a-la-carbonara.jpeg"],
      ],
      dessert: [
        ["Fondant au chocolat","Gateau au chocolat au coeur fondant", 6, "https://img-3.journaldesfemmes.fr/bFLBfIV2xQoIMyxLHn-ya2A4jO4=/800x600/smart/3fab692feaaf4aeda820708bbb11ada6/recipe-jdf/10018954.jpg"],
        ["Tiramisu","Dessert italien à base de mascarpone ", 7, "https://www.galbani.fr/wp-content/uploads/2017/07/le_veritable_tiramisu_par_il_gusto_italiano_0.png"],
        ["Crumble pomme cannelle","Le traditionnel crumble au pomme avec une touche de cannelle", 5, "https://d1e3z2jco40k3v.cloudfront.net/-/media/ducrosfr-2016/recipes/2000/crumble_pomme_2000.jpg?rev=109757992e4242dda91bbc2fa3c5fb99&vd=20200704T131451Z&ir=1&width=885&height=498&crop=auto&quality=75&speed=2&hash=1D65D0CC6B6F5CED96685D365C5AEACD"],
        ["Tarte au citron","Tatre au citron faite maison avec sa meringue", 5, "https://img.cuisineaz.com/660x660/2018-03-19/i138661-tarte-au-citron-meringuee-simple-et-rapide.jpeg"],
        ["Tarte aux framboises","Tarte aux framboises fraîchement récoltées sur un lit de crème pâtissière", 5, "https://img.cuisineaz.com/660x660/2016-03-25/i97384-tarte-patissiere-aux-framboises.jpg"],
        ["Panna Cotta à la mangue","Dessert italien à base de crème avec un coulis de mangue fraîche", 5, "https://www.recette247.com/wp-content/uploads/2019/02/Panna-cotta-au-coulis-de-mangue-au-thermomix.jpg"],
        ["Mousse au chocolat","Mousse à base de chocolat au lait et de blancs d'oeuf montés en neige", 5, "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F07.2F30.2Fc908d905-dbda-48c9-b0ac-3441664ac404.2Ejpeg/850x478/quality/90/crop-from/center/mousse-au-chocolat-allegee.jpeg"],
        ["Ile flottante","Entremêt à base de blancs d'oeuf sucrés fouettés, accompagné de crème anglaise et d'un nappage au caramel", 5, "https://www.regal.fr/sites/art-de-vivre/files/Import/ile-flottante-creme-anglaise-caramel_ss.jpg"],
        ["Baba au rhum","Savarin servi imbibé d'un sirop au rhum", 8, "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/182332_411-0-2612-2612.jpg"],
        ["Flan pâtissier","Flan sur une base de pâte brisée", 7, "https://www.atelierdeschefs.com/media/recette-e10083-flan-patissier-a-la-vanille.jpg"],
      ],
      selectedEntree: null,
      selectedPlat: null,
      selectedDessert: null,
      midiEntree: null,
      midiPlat: null,
      midiDessert: null,
      gastroEntree1: null,
      gastroEntree2: null,
      gastroPlat: null,
      gastroDessert1: null,
      gastroDessert2: null,
      commande: [],
      prix: [],
      dataPanier: [],
      totalPanier: 0,
    };
  },
  methods: {
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    priceMidi(){
      return (this.midiEntree[2] + this.midiPlat[2] + this.midiDessert[2]);
    },
    priceGastro(){
      return (this.gastroEntree1[2] + this.gastroEntree2[2] + this.gastroPlat[2] + this.gastroDessert1[2] + this.gastroDessert2[2]);
    },
    ajouterPanier(nom,prix){
      this.commande.push(nom);
      this.prix.push(prix);
      this.dataPanier.push([nom,prix]);
      this.totalPanier += prix;
      console.log(this.dataPanier )
    },
    supprimerArticle(article){
      if(this.dataPanier != null){
        this.totalPanier -= article[1];
        let index = this.dataPanier.indexOf(article);
        this.dataPanier.splice(index,1);
        

      }
      
    }
  },
  created() {
    this.selectedEntree = this.randomItem(this.entree);
    this.selectedPlat = this.randomItem(this.plat);
    this.selectedDessert = this.randomItem(this.dessert);
    this.midiEntree = this.randomItem(this.entree);
    this.midiPlat = this.randomItem(this.plat);
    this.midiDessert = this.randomItem(this.dessert);
    this.gastroEntree1 = this.randomItem(this.entree);
    this.gastroEntree2 = this.randomItem(this.entree);
    this.gastroPlat = this.randomItem(this.plat);
    this.gastroDessert1 = this.randomItem(this.dessert);
    this.gastroDessert2 = this.randomItem(this.dessert);
  },
 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
template{
  width: 100%;
  height: 100%
}
#base {
  padding: 10px;
  width: 80%;
  box-shadow: 0px 0px 12px #414141;
  margin: 0 auto;
  margin-top: 3%;
  background-color: white;
}
#navigation{
  width: 100%;
  height: 40px;
  background-color: white;
}
#carte, #menu {
  width: 40%;
  height: 90%;
  background-color: white;
  text-align: center;
  
  overflow-x: auto;
  /*overflow-y: auto;*/
}
#carte {
  margin-left: 55%;
  
  
}

#menu {
  float: left;
  margin-left: 5%;
  

}

#Panier {
  width: 40%;
  background-color: white;
  position: absolute;
  margin-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 0px 12px #414141;
}
</style>