angular.module('todo')
	.controller('TodoCtrl', function TodoCtrl($scope) {
		'use strict';
		
		$scope.getFromLocalStorage = function () {
			return JSON.parse(localStorage.getItem('todo') || '[]');
		};

		$scope.saveToLocalStorage = function (todos) {
			localStorage.setItem('todo', JSON.stringify(todos));
		};

		$scope.todoList = $scope.getFromLocalStorage();
		$scope.newTodo = '';
		$scope.allChecked = false;

		$scope.addTodo = function () {
			let todo = {
				title: $scope.newTodo.trim(),
				completed: false
			};
			if (todo.title) {
				$scope.todoList.push(todo);
				$scope.newTodo = '';
				$scope.saveToLocalStorage($scope.todoList);
			}
		};

		$scope.deleteTodo = function (todo) {
			var idx = $scope.todoList.indexOf(todo);

			if (idx > -1) {
			  $scope.todoList.splice(idx, 1);
			  $scope.saveToLocalStorage($scope.todoList);
			}
		};

		$scope.clearCheckedTodos = function () {
			$scope.todoList = $scope.todoList.filter(function (todo) {
				return !todo.completed;
			});

			if ($scope.todoList.length == 0)
				$scope.allChecked = false;

			$scope.saveToLocalStorage($scope.todoList);
		};

		$scope.markAll = function () {
			$scope.allChecked = !$scope.allChecked;
			$scope.todoList.forEach(function (todo) {
				todo.completed = $scope.allChecked;
			});
			$scope.saveToLocalStorage($scope.todoList);
		};
	});