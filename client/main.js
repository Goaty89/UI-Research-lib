import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import styles from './stylesheets/style.css';
import './main.html';

Template.mainLayout.helpers({
  styles: styles
});

Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.route('/', function () {
  this.render('header', {to: 'header'});
  this.render('container');
  this.render('asideContainer', {to: 'aside'});
});

Router.route('home', function () {
  this.render('header', {to: 'header'});
  this.render('home');
  this.render('asideContainer', {to: 'aside'});
});
Router.route('fullDetails', function () {
  this.render('header', {to: 'header'});
  this.render('fullDetails');
  this.render('asideContainer', {to: 'aside'});
});
