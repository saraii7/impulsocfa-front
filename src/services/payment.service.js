const API_URL = 'http://localhost:3000/api/payments';

/**
 * Crea una preferencia de pago en Mercado Pago
 * @param {Object} paymentData - Datos del pago
 * @param {number} paymentData.amount - Monto de la donación
 * @param {string} paymentData.campaignTitle - Título de la campaña
 * @param {number} paymentData.campaignId - ID de la campaña
 * @param {number} paymentData.userId - ID del usuario
 * @returns {Promise<string>} preferenceId - ID de la preferencia de Mercado Pago
 */
export async function createPreference(paymentData) {
  try {
    const res = await fetch(`${API_URL}/create_preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al crear la preferencia de pago");

    return data.id; // El backend devuelve el ID de la preferencia
  } catch (error) {
    console.error("Error en createPreference:", error);
    throw error;
  }
}
