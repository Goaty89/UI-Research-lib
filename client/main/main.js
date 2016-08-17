import { Template } from 'meteor/templating';
import { Meteor  } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import styles from '../style.css';
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
  this.render('page');
  this.render('asideNav', {to: 'aside'});
  this.render('footer', {to: 'footer'});
});

Router.route('home', function () {
  this.render('header', {to: 'header'});
  this.render('home');
  this.render('asideNav', {to: 'aside'});
  this.render('footer', {to: 'footer'});
});
Router.route('fullDetails', function () {
  this.render('header', {to: 'header'});
  this.render('fullDetails');
  this.render('footer', {to: 'footer'});
});
Router.route('adminDetailPage', function () {
  this.render('header', {to: 'header'});
  this.render('adminDetailPage');
  this.render('footer', {to: 'footer'});
});
Router.route('courseComparison', function () {
  this.render('header', {to: 'header'});
  this.render('courseComparison');
  this.render('comparisonAside', {to: 'aside'});
  this.render('footer', {to: 'footer'});
});
Router.route('detailPage', function () {
  this.render('header', {to: 'header'});
  this.render('detailPage');
  this.render('footer', {to: 'footer'});
});
Router.route('login', function () {
  this.render('header', {to: 'header'});
  this.render('login');
  this.render('footer', {to: 'footer'});
});
Router.route('register', function () {
  this.render('header', {to: 'header'});
  this.render('register');
  this.render('footer', {to: 'footer'});
});