-- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

\c sdcreviews;

create table review (
    id serial primary key,
    product_id int,
    rating int,
    post_date timestamp,
    summary text,
    body text,
    recommend boolean,
    reported boolean,
    reviewer_name text,
    reviewer_email text,
    response text,
    helpfulness int


);

create table photolinks (
    id serial primary key,
    review_id int,
    image_url text,
    constraint id_review_table
      foreign key(id) 
        references review(id)
);

