import { timeStamp } from "console";
import { Many, not ,relations} from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { boolean, decimal } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable,serial,text,date,varchar,} from "drizzle-orm/pg-core";
export const tableState=pgTable("state",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    code:varchar("code",{length:255}).notNull(),
    city:text("city").notNull()

});
export const tableCity=pgTable("city",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    state_id:integer("state_id").notNull().references(()=>tableState.id,{onDelete:"cascade"}),
    address:text("address").notNull(),
    state:text("state").notNull(),
    restorand:text("restorand").notNull(),
});
export const tableRestaurant=pgTable("restaurant",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    street_address:varchar("street_address",{length:255}).notNull(),
    zip_code:varchar("zip_code",{length:255}).notNull(),
    city_id:integer("city_id").notNull().references(()=>tableCity.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    menu_item:text("menu_item").notNull(),
    orders:text("orders").notNull(),
    city:text("city").notNull(),
    restaurand_owner:text("resteraurand_owner").notNull()
});
export const tableCategory=pgTable("category",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    menu_item:text("menu_item").notNull(),
});
export const tableMenu_item=pgTable("menu_item",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    restaurand_id:integer("restaurand_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    category_id:integer("category_id").notNull().references(()=>tableCategory.id,{onDelete:"cascade"}),
    description:varchar("description").notNull(),
    ingredient:varchar("ingredient").notNull(),
    price:decimal("price").notNull(),
    active:boolean("active").notNull(),
    created_at:timestamp("created_at").notNull(),
    update_at:timestamp("updated_at").notNull(),
    category:text("category").notNull(),
    order_menu_item:text("oder_menu_item").notNull(),
});
export const tableUsers=pgTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    contact_phone:varchar("contact_phone",{length:255}).notNull(),
    phone_verified:boolean("phone_verified").notNull(),
    email:varchar("email").notNull(),
    email_verified:boolean("email_verified").notNull(),
    confirmation_code:varchar("confirmation_code"),
    password:varchar("password",{length:255}).notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    address:text("address").notNull(),
    comment:text("comment").notNull(),
    driver:text("driver").notNull(),
    orders:text("orders").notNull(),
    restaurant_owner:text("restaurant_owner").notNull(),
});
export const tableOrders=pgTable("orders",{
    id:serial("id").primaryKey(),
    restaurant_id:integer("restaurand_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    estimate_delivery_time:date("estimate_delivery_time").notNull(),
    actuall_delivery_time:date("actual_deliver_time").references(()=>tableAddress.id,{onDelete:"cascade"}),
    delivery_address_id:integer("delivery_address_id").notNull(),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    driver_id:integer("driver_id").references(()=>tableDriver.id,{onDelete:"cascade"}),
    price:decimal("price").notNull(),
    discount:decimal("discount").notNull(),
    final_price:decimal("final_price").notNull(),
    comment:varchar("comment",{length:255}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    comments:text("comments").notNull(),
    oder_menu_item:text("oder_menu-item").notNull(),
    order_status:text("order_status").notNull(),
    driver:varchar("driver",{length:255}),
    restaurant:text("restaurant").notNull(),
    users:text("users").notNull(),
});
export const tableOder_menu_item=pgTable("order_menu_item",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    menu_item_id:integer("menu_item_id").notNull().references(()=>tableMenu_item.id,{onDelete:"cascade"}),
    quantity:integer("quantity").notNull(),
    item_price:decimal("item_price").notNull(),
    price:decimal("price").notNull(),
    comment:varchar("commant").notNull(),
    menu_item:text("menu").notNull(),
    orders:text("orders").notNull(),
});
export const tableRestaurant_owner=pgTable("restaurant_owner",{
    id:serial("id").primaryKey(),
    restaurant_id:integer("restaurant_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    owner_id:integer("owner").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    users_id:text("users").notNull(),
    restaurant:text("restaurant").notNull(),
});
export const tableAddress=pgTable("address",{
    id:serial("id").primaryKey(),
    street_address_1:varchar("street_address_1",{length:255}).notNull(),
    street_address_2:varchar("street_address_2",{length:255}).notNull(),
    zip_code:varchar("zip_code").notNull(),
    delivery_instructions:varchar("delivery_instructions"),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    city_id:integer("city_id").notNull().references(()=>tableCity.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    city:text("city").notNull(),
    users:text("users").notNull(),
    orders:text("orders").notNull(),
});
export const tableComment=pgTable("comment",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    comment_text:varchar("comment_text",{length:255}).notNull(),
    is_complaint:boolean("is_complaint").notNull(),
    is_praise:boolean("is_praise").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    orders:text("orders").notNull(),
    users:text("users").notNull(),
});

export const tableDriver=pgTable("driver",{
    id:serial("id").primaryKey(),
    car_make:varchar("car_make").notNull(),
    car_model:varchar("car_model").notNull(),
    car_year:integer("car_year").notNull(),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    online:boolean("online").notNull(),
    delivering:boolean("delivering").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    users:text("users").notNull(),
    oders:text("oders").notNull(),
});

export const tableOrder_status=pgTable("order_status",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    status_catalog_id:integer("status_id").notNull().references(()=>tableStatus_catalog.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    orders:text("orders"),
    status_catalog:text("status_catalog").notNull(),
});
export const tableStatus_catalog=pgTable("status_catalog",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}),
    order_status:text("order_status").notNull(),
});
export const stateRelations = relations(tableState,({one,many})=>({
    city:many(tableCity),
}));


export const cityRelations = relations(tableCity, ({ one }) => ({
    state: one(tableState, {
        fields: [tableCity.state_id],
        references: [tableState.id]
    })
}));
export const userRelations = relations(tableUsers,({one,many})=>({
    tableRestaurant_owner:many(tableRestaurant_owner),
}));
export const restaurant_ownerRelations = relations(tableRestaurant_owner, ({ one }) => ({
    users: one(tableUsers, {
        fields: [tableRestaurant_owner.users_id],
        references: [tableUsers.id]
    })
}));
// export const userrestaurandRelations = relations(tableR,({one,many})=>({
//     tableRestaurant_owner:many(tableRestaurant_owner),
// }));
// export const restaurant_ownerRelations = relations(tableRestaurant_owner, ({ one }) => ({
//     users: one(tableUsers, {
//         fields: [tableRestaurant_owner.owner_id],
//         references: [tableUsers.id]
//     })
// }));
export const categoryRelations = relations(tableCategory,({one,many})=>({
    menu_item:many(tableMenu_item),
}));


export const table_menuRelations = relations(tableMenu_item, ({ one }) => ({
    Category: one(tableCategory, {
        fields: [tableMenu_item.category_id],
        references: [tableCategory.id]
    })
}));
export const statusRelations = relations(tableStatus_catalog,({one,many})=>({
    order_status:many(tableOrder_status),
}));


export const order_statusRelations = relations(tableOrder_status, ({ one }) => ({
    status_catalogue: one(tableStatus_catalog, {
        fields: [tableOrder_status.status_catalog_id],
        references: [tableStatus_catalog.id]
    })
}));
export const users_oderRelations = relations(tableUsers,({one,many})=>({
    orders:many(tableOrders),
}));


export const order_usersRelations = relations(tableOrders, ({ one }) => ({
    users: one(tableUsers, {
        fields: [tableOrders.user_id],
        references: [tableUsers.id]
    })
}));
export const retaurant_ownerRelations = relations(tableRestaurant,({one,many})=>({
    restaurant_owners:many(tableRestaurant_owner),
}));


export const restaurant_owner_restaurantRelations = relations(tableRestaurant_owner, ({ one }) => ({
    restaurants: one(tableRestaurant, {
        fields: [tableRestaurant_owner.restaurant_id],
        references: [tableRestaurant.id]
    })
}));
export const order_orderStatusRelations = relations(tableOrders,({one,many})=>({
    order_status:many(tableOrder_status),
}));


export const orderStatus_ordersRelations = relations(tableOrder_status, ({ one }) => ({
    oder: one(tableOrders, {
        fields: [tableOrder_status.order_id],
        references: [tableOrders.id]
    })
}));
export const driverRelations = relations(tableDriver,({one,many})=>({
    order:many(tableOrders),
}));


export const adressDriverRelations = relations(tableOrders, ({ one }) => ({
    driver: one(tableDriver, {
        fields: [tableOrders.driver_id],
        references: [tableDriver.id]
    })
}));
export const order_commentRelations = relations(tableOrders,({one,many})=>({
    comment:many(tableComment),
}));


export const comment_orderRelations = relations(tableComment, ({ one }) => ({
    orderComment: one(tableOrders, {
        fields: [tableComment.order_id],
        references: [tableOrders.id]
    })
}));
// export type TIstate = typeof tableState.$inferInsert;
// export type TSstate = typeof tableState.$inferSelect;
// export type TIstate = typeof tableCity.$inferInsert;
// export type TSstate = typeof tableCity.$inferSelect;
export type TIstate=typeof tableState.$inferInsert;
export type TSstate=typeof tableState.$inferSelect;
export type TIcity=typeof tableCity.$inferInsert;
export type TScity=typeof tableCity.$inferSelect;
export type TIcategory=typeof tableCategory.$inferInsert;
export type TScategory=typeof tableCategory.$inferSelect;
export type TSstatus_catalog=typeof tableStatus_catalog.$inferInsert;
export type TIstatus_catalog=typeof tableStatus_catalog.$inferSelect;