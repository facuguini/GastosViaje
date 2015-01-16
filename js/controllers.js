angular.module('gastos.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
 
})




.controller('MainCtrl', function($scope, $rootScope, $ionicModal) {
  /* MODAL */ 
  $scope.cNuevo = function() {
    $ionicModal.fromTemplateUrl('templates/nuevo.html', {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {
      $scope.nuevo = modal;
      $scope.nuevo.fecha = convertDate(new Date())
      $scope.nuevo.monto = 0.00
      $scope.nuevo.descripcion = ""
      $scope.nuevo.show();
    });

  }

  $scope.crear = function (_descripcion, _fecha, _monto, _persona) {
    if (isNullOrWhitespace(_persona)) {
      alert("Debe cargar la persona");
    } else {
      $scope.items.push({descripcion: _descripcion, fecha: _fecha, monto: _monto, persona: _persona})
      localStorage.setItem("items", JSON.stringify($scope.items))
      $scope.nuevo.descripcion = ""
      //$scope.nuevo.fecha = convertDate(new Date())
      $scope.nuevo.monto = 0
      for (i=0 ; i<$scope.personas.length ; i++) {
        if ($scope.personas[i].nombre === _persona) {
          $scope.personas[i].total = $scope.personas[i].total + _monto;
        }
      }
      localStorage.setItem("personas", JSON.stringify($scope.personas))
      $scope.nuevo.hide();
    }
  }

  /* MODAL 2 */
  $ionicModal.fromTemplateUrl('templates/editar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal){
    $scope.editar = modal;
  });

  /*Resto*/
  $scope.showDelete = false
  $scope.persona = {nombre:"", total:0}
  $scope.filtro = {descripcion: ""}
  $scope.item = {descripcion: "", fecha: null ,monto: 0, persona: ""}
  if (localStorage.getItem("items")!=null){$scope.items = JSON.parse(localStorage.getItem("items"));} else {$scope.items = []}
  $scope.personas = [{nombre: "", total: 0}]
  if (localStorage.getItem("personas")!=null){$scope.personas = JSON.parse(localStorage.getItem("personas"));} else {$scope.personas = []}
  
  $scope.edicion = function (id, descripcion, fecha, monto, persona) {
    $scope.editar.id = id;
    $scope.editar.descripcion = descripcion;
    $scope.editar.fecha = fecha;
    $scope.editar.monto = monto;
    $scope.editar.montoAux = monto;
    $scope.editar.nombre = persona;
    $scope.editar.nombreAux = persona;
    $scope.editar.show();
  }

  $scope.eliminar = function (id, _monto, _persona) {
    $scope.items.splice(id, 1);
    for (i=0 ; i<$scope.personas.length ; i++) {
      if ($scope.personas[i].nombre === _persona) {
        $scope.personas[i].total = $scope.personas[i].total - _monto;
      }
    }
    localStorage.setItem("personas", JSON.stringify($scope.personas))
    localStorage.setItem("items", JSON.stringify($scope.items))
    $scope.editar.hide();
  }

  $scope.guardar = function (id, _descripcion, _fecha, _monto, _persona, _montoAux, _nombreAux) {
    $scope.items[id] = {
      descripcion: _descripcion,
      fecha: _fecha,
      monto: _monto,
      persona: _persona
    }
    if (_persona === _nombreAux) {
      for (i=0 ; i<$scope.personas.length ; i++) {
        if ($scope.personas[i].nombre === _persona) {
          $scope.personas[i].total = $scope.personas[i].total - _aux;
          $scope.personas[i].total = $scope.personas[i].total + _monto;
        }
      }
    } else {
      for (i=0 ; i<$scope.personas.length ; i++) {
        if ($scope.personas[i].nombre === _persona) {
          $scope.personas[i].total = $scope.personas[i].total + _monto;
        }
        if ($scope.personas[i].nombre === _nombreAux) {
          $scope.personas[i].total = $scope.personas[i].total - _montoAux;
        }
      }
    }
    localStorage.setItem("personas", JSON.stringify($scope.personas))
    localStorage.setItem("items", JSON.stringify($scope.items))
    $scope.editar.hide();
  }

  $scope.nuevaPersona = function (_nombre) {
    $scope.personas.push({nombre: _nombre, total: 0})
    localStorage.setItem("personas", JSON.stringify($scope.personas))
    $scope.persona.nombre = ""
  }

  $scope.sDelete = function () {
    $scope.showDelete = !$scope.showDelete
  }

  $scope.deletePersona = function (id) {
    $scope.personas.splice(id, 1);
    localStorage.setItem("personas", JSON.stringify($scope.personas))
  }

  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = inputFormat.getFullYear() + "-" + pad(inputFormat.getMonth()+1) + "-" + pad(inputFormat.getDate())
    return d;
  }
  function isNullOrWhitespace( input ) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
  }
})

