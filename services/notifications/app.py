from flask import Flask, request, jsonify

app = Flask(__name__)

# Enviar notificación
@app.route('/notifications/<int:order_id>', methods=['POST'])
def send_notification(order_id):
    data = request.get_json()
    # Aquí enviaríamos la notificación usando un servicio como Twilio o SMTP
    return jsonify({'message': f'Notification sent for order {order_id}'})

if __name__ == '__main__':
    app.run(debug=True)
