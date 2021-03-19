\c sdcreviews;

drop table characteristic_review;

create table characteristic_review (
  id serial primary key,
  characteristic_id int,
  review_id int,
  char_value int,
  constraint characteristic_id
    foreign key(id)
      references characteristic(id)
);