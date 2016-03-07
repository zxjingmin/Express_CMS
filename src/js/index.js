myAppModule=angular.module('myApp',[]);
myAppModule.controller('worldCtrl', ['$scope',function($scope){
    $scope.countries=[
            {name:'jingmin',population:33},
            {name:'zhang',population:22}
        ];
    $scope.population=function(){
        var total=0;
        for(item in $scope.countries){
            total+=$scope.countries[item].population
        }
        return total;
    }
    $scope.addBtn=function(){
        $scope.countries.push({name:'zhang1',population:232})
    }
}])
myAppModule.controller('categoryList',['$scope','$http',function($scope,$http){
    $http.get("/category/list?json=true")
    .success(function(data){
        $scope.categories=data;
    })
    $scope.formData={
        category:{
            name:"新闻主体"
            }
        }
    $scope.submitCategoryForm=function(){
        $http({
            method  : 'POST',
            url     : '/category/add',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function(data){
                $scope.categories.push(data.data)
                $("#addCategoryDlg").modal("toggle");
            });
    }
    $scope.reomveCategoryBtn=function(event){
        var target = $(event.target)
        var _id=target.data('id')
        $http({
                method  : 'DELETE',
                url     : '/category/remove/'+_id
            }).success(function(data){
                var whatIndex
                angular.forEach($scope.categories, function(cb, index) {
                    if (cb._id === _id) {
                        whatIndex = index;
                    }
                });
                $scope.categories.splice(whatIndex, 1);
            });
    }
}]);
