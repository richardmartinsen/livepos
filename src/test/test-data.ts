import * as moment from 'moment';

import {DateUtils} from '../app/common/date-utils';

/* tslint:disable */
export const projectData = [
  { title: 'Manglerud skole', address: "Stasjonsveien 55", start: DateUtils.formatLong(moment().add(1, 'd').toDate()), end: DateUtils.formatLong(moment().add(2, 'd').toDate()), car : ["BR51123"], staff : ["Sussi.Olsen@gmail.com", "TomK.Pilsen@gmail.com"], released : true },
  { title: 'Costro øst', address: "Ekeberg", start: DateUtils.formatLong(moment().subtract(1, 'd').toDate()), end: DateUtils.formatLong(moment().add(1, 'd').toDate()), car : ["DE65345"], staff : ["Sussi.Olsen@gmail.com"], released : true },
  { title: 'NRC', address: "Branderudveien", start: DateUtils.formatLong(moment().subtract(1, 'd').toDate()), end: DateUtils.formatLong(moment().toDate()), car : ["EL12353"], staff : ["TomK.Pilsen@gmail.com", "janni.hansen@gmail.com"], released : true },
  { title: 'Vethe', address: "Bygdøy", start: DateUtils.formatLong(moment().add(8, 'd').toDate()), end: DateUtils.formatLong(moment().add(18, 'd').toDate()), car : ["EL12353"], staff : ["Therese.Nilsen@gmail.com"], released : true },
  { title: 'Veflen', address: "Jens Bjerkes gate", start: DateUtils.formatLong(moment().subtract(3, 'd').toDate()), end: DateUtils.formatLong(moment().subtract(1, 'd').toDate()), car : ["BR51123"], staff : ["Sussi.Olsen@gmail.com"], released : true },
  { title: 'Veflen', address: "Thereses gate", start: DateUtils.formatLong(moment().subtract(1, 'd').toDate()), end: DateUtils.formatLong(), car : ["DE65345"], staff : ["janni.hansen@gmail.com"], released : true },
  { title: 'Hag Anlegg', address: "Stasjonsveien 55", start: DateUtils.formatLong(moment().add(4, 'd').toDate()), end: DateUtils.formatLong(moment().add(7, 'd').toDate()), car : ["UR12543"], staff : ["Sussi.Olsen@gmail.com"], released : true },
  { title: 'Knut A. Brevik AS', address: "Solbergveien", start: DateUtils.formatLong(moment().add(3, 'd').toDate()), end: DateUtils.formatLong(moment().add(8, 'd').toDate()), car : ["UR12543"], staff : ["TomK.Pilsen@gmail.com"], released : true },
  { title: 'NRC', address: "Ekebergveien", start: DateUtils.formatLong(moment().add(5, 'd').toDate()), end: DateUtils.formatLong(moment().add(5, 'd').toDate()), car : ["DE65345"], staff : ["janni.hansen@gmail.com"], released : true }
];

export const personData = [
{ first_name: "Janni", last_name: "Hansen", email : "janni.hansen@my-mail-domain.com", phone : "12312312"},
{ first_name: 'Sussi', last_name: "Olsen", email : "Sussi.Olsen@my-mail-domain.com", phone : "12312312" },
{ first_name: 'Therese', last_name: "Nilsen", email : "Therese.Nilsen@my-mail-domain.com", phone : "12312312"},
{ first_name: 'Tom K', last_name: "Pilsen", email : "TomK.Pilsen@my-mail-domain.com", phone : "12312312" },
{ first_name: 'Gunnar', last_name: "Paulsen", email : "Gunnar.Paulsen@my-mail-domain.com", phone : "12312312" },
{ first_name: 'Robert', last_name: "Fransen", email : "Robert.Fransen@my-mail-domain.com", phone : "12312312" },
{ first_name: 'Øyvind', last_name: "Frinsen", email : "Øyvind.Frinsen@my-mail-domain.com", phone : "12312312" },
{ first_name: 'Lina', last_name: "Fronsen", email : "Lina.Fronsen@my-mail-domain.com", phone : "12312312" }

];

export const carData = [
 {licence: "BR51123", brand: "Mazda2"},
 {licence: "DE65345", brand: "Toyota"},
 {licence: "UR12543", brand: "Skoda Octavia"},
 {licence: "EL12353", brand: "Citroen"},
 {licence: "EK53145", brand: "Nissan leaf"}
];

export const posData = [
  {email: "mail@domene.no", lat: 59.1234, long: 10.9876},
  {email: "mail@domene.no", lat: 59.2345, long: 10.8765},
  {email: "mail@domene.no", lat: 59.3456, long: 10.7654}
 ];

/* tslint:enable */
