from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tienda_user:tienda_password@localhost:5432/orders_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de la tabla Orden
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    products = db.Column(db.String, nullable=False)  # IDs de productos separados por comas
    status = db.Column(db.String(20), nullable=False)

# Crear la base de datos y las tablas
@app.before_first_request
def create_tables():
    db.create_all()

# Obtener todas las órdenes
@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([{'id': o.id, 'user_id': o.user_id, 'products': o.products, 'status': o.status} for o in orders])

# Crear nueva orden
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(user_id=data['user_id'], products=','.join(map(str, data['products'])), status='created')
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created'}), 201

# Actualizar estado de la orden
@app.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'message': 'Order not found'}), 404
    order.status = request.json.get('status', order.status)
    db.session.commit()
    return jsonify({'message': 'Order updated'})

# Eliminar orden
@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'message': 'Order not found'}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted'})

if __name__ == '__main__':
    app.run(debug=True)
