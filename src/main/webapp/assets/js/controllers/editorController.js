/**
 * Created by Ezequiel on 26/07/2016.
 */

app.directive('ngTouchSpin'['$timeout', '$interval',
    function($timeout, $interval) {}]);

app.controller('editorController', function($scope,Mapa,MyService,$routeParams,$location) {
    var largo = 30;
    var mapa = $routeParams.id ? mapas[$routeParams.id]:mapas["modulo1"];
    var modelo1 = MapaEditor.desParsear(mapa);
    $scope.callesV= modelo1.callesHorizontales[0].cuadras.length - 1;
    $scope.callesH= modelo1.callesVerticales[0].cuadras.length - 1;
    $scope.nombre=modelo1.nombre;
    $scope.intervalo = 5; //se puede settear en el reproductor antes de arrancar
    $scope.callesH = 3;
    $scope.callesV = 3;
    var stage = new createjs.Stage("mapa");
    var logica = new GrillaController(3,3,largo,stage,$scope);
    createjs.Ticker.on("tick", stage);
    logica.setModelo(modelo1);
    logica.redibujar();
    logica.seleccionarPrimerCuadra();


    $scope.$watch('callesH',function (newValue,oldValue){
        if (newValue===oldValue) {
            return;
        }
        if (newValue>oldValue) {
            $scope.agregarCalleH(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleH(newValue,oldValue);
        }
    });

    $scope.$watch('callesV',function (newValue,oldValue){

        if (newValue===oldValue) {
            return;
        }

        if (newValue>oldValue) {
            $scope.agregarCalleV(newValue,oldValue);
        }
        if (newValue<oldValue) {
            $scope.quitarCalleV(newValue,oldValue);
        }

    });

    $scope.generarMapa = function(){
        if ($scope.nombre != "") {
            console.log(JSON.stringify(logica.modelo));
            //Mapa.save(JSON.stringify(logica.modelo));
            //alert(JSON.stringify(logica.modelo))
            $scope.modelo = logica.modelo;
            mapas["moduloNuevo"] = JSON.stringify(logica.modelo);
            $location.url("app/reproductor/moduloNuevo");
        }
        else
        {
            alert("Debe ingresar un nombre al mapa para poder generarlo.");
        }
    }

    $scope.actualizar = function (){
    };

    $scope.agregarCalleH = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleHorizontal();
        logica.redibujar();
    };

    $scope.agregarCalleV = function (newVal,oldVal) {
        for(h=0;h<(newVal-oldVal);h++)
        logica.agregarCalleVertical();
        logica.redibujar();
    }

    $scope.quitarCalleH= function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleHorizontal();
        logica.redibujar();
    }

    $scope.quitarCalleV=function(newVal,oldVal){
        for(h=0;h<(oldVal-newVal);h++)
        logica.quitarCalleVertical();
        logica.redibujar();

    }
});
