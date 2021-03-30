const seed = async pg =>
  pg.query(`CREATE TABLE IF NOT EXISTS coffees (
      coffee_id serial PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      DESCRIPTION VARCHAR(400) NOT NULL
    );
    
    INSERT INTO coffees(name, description)
    VALUES
    ('affogato', 'Espresso poured on a vanilla ice cream. Served in a cappuccino cup.'),
    ('americano', 'Espresso with added hot water (100–150 ml). Often served in a cappuccino cup. (The espresso is added into the hot water rather than all the water being flowed through the coffee that would lead to over extraction.)'),
    ('caffe latte', 'A tall, mild milk coffee (about 150-300 ml). An espresso with steamed milk and only a little milk foam poured over it. Serve in a latte glass or a coffee cup. Flavoured syrup can be added. '),
    ('caffe mocha', 'A caffè latte with chocolate and whipped cream, made by pouring about 2 cl of chocolate sauce into the glass, followed by an espresso shot and steamed milk. '),
    ('cafe au lait', 'French morning coffee. Made by mixing dark roasted filter coffee (often prepared with French Press) and warm milk. Served in a bowl or a large coffee cup.'),
    ('cappuccino', 'A coffee drink consisting of espresso and a milk foam mixture (drink size about 160–240 ml). Served in a cappuccino cup.'),
    ('cold brew coffee', 'Cold Brew Coffee is a smooth, cold beverage prepared by brewing freshly ground coffee in cold water. In the Cold Brew process, time makes up for heat.'),
    ('doppio', 'Double portion of espresso in a cappuccino/espresso cup.'),
    ('espresso', 'A short, strong drink (about 30 ml) served in an espresso cup.'),
    ('espresso con panna', 'A shot of espresso topped with whipped cream. Served in an espresso cup.'),
    ('espresso macchiato', 'Espresso with a little milk foam (drink size about 50 ml). Served in an espresso cup.'),
    ('flat white', 'A coffee drink with a double espresso and lightly frosted milk (About 150–240 ml). Served in a glass.'),
    ('frappe', 'Rich iced coffee made of espresso, milk and ice. Flavoured syrup can be added (about 300 ml). Mixed in a blender and served for example in a latte glass.'),
    ('freakshake', 'Basically anything that is blended/mixed/stirred and served with various topping. Coffee Freakshakes are often made with cold brew coffee.'),
    ('ice latte', 'Ice, cold milk and an espresso in a latte glass (about 300 ml); often mixed with some sugar or flavoured syrup. Served in a latte glass.'),
    ('caffe mocha', 'Cold Caffè mocha. Prepared like iced latte, but garnished and flavoured like caffè mocha (about 300 ml). Served in a latte glass.'),
    ('espresso con panna', 'Classic coffee coctail where Irish whiskey is mixed with filter coffee and topped with thin layer of gently whipped cream.'),
    ('latte macchiato', 'Like a traditional caffè latte, but with a thicker layer of foam. Often made by pouring an espresso last into the milk (drink size about 300 ml). Served in a latte glass.'),
    ('latte macchiato', 'An espresso pulled long (50–60 ml). Served in an espresso/cappuccino cup.'),
    ('ristretto', 'A very short shot of espresso (about 20 ml). Served in an espresso cup.');
    `)

module.exports = seed
