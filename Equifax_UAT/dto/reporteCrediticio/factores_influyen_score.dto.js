/*{
 "factores_influyen_score": [
 {
 "numero_operaciones_historicas": 0,
 "numero_operaciones_vigentes": 0,
 "numero_operaciones_vencidas": 0,
 "saldo_por_vencer": 0,
 "saldo_vencido": 0,
 "saldo_demanada_judicial": 0,
 "saldo_cartera_castigada": 0,
 "maximo_saldos_vencidos": 0,
 "tiempo_trancurrido_primer_credito": "",
 "vencidos_actuales": 0,
 "maximo_dias_vencido": 0,
 "saldo_deuda_nuevos_creditos": 0
 }
*/
/** DTO for factores_influyen_score
 * @typedef {Object} factores_influyen_scoreDTO
 * @property {number} numero_operaciones_historicas - Number of historical operations.
 * @property {number} numero_operaciones_vigentes - Number of active operations.
 * @property {number} numero_operaciones_vencidas - Number of overdue operations.
 * @property {number} saldo_por_vencer - Balance to be paid.
 * @property {number} saldo_vencido - Overdue balance.
 * @property {number} saldo_demanada_judicial - Balance in judicial demand.
 * @property {number} saldo_cartera_castigada - Balance in charged-off portfolio.
 * @property {number} maximo_saldos_vencidos - Maximum overdue balance.
 * @property {string} tiempo_trancurrido_primer_credito - Time elapsed since the first credit.
 * @property {number} vencidos_actuales - Current overdue count.
 * @property {number} maximo_dias_vencido - Maximum days overdue.
 * @property {number} saldo_deuda_nuevos_creditos - Balance of new credits.

 */

function parseFactoresInfluyenScore(factores_influyen_score) {
     if (!Array.isArray(factores_influyen_score) || !factores_influyen_score.length) {
        return [];
    }
    return factores_influyen_score.map(item => ({
        numero_operaciones_historicas: item.numero_operaciones_historicas || 0,
        numero_operaciones_vigentes: item.numero_operaciones_vigentes || 0,
        numero_operaciones_vencidas: item.numero_operaciones_vencidas || 0,
        saldo_por_vencer: item.saldo_por_vencer || 0.00,
        saldo_vencido: item.saldo_vencido || 0.00,
        saldo_demanada_judicial: item.saldo_demanada_judicial || 0.00,
        saldo_cartera_castigada: item.saldo_cartera_castigada || 0.00,
        maximo_saldos_vencidos: item.maximo_saldos_vencidos || 0.00,
        tiempo_trancurrido_primer_credito: item.tiempo_trancurrido_primer_credito || '',
        vencidos_actuales: item.vencidos_actuales || 0,
        maximo_dias_vencido: item.maximo_dias_vencido || 0,
        saldo_deuda_nuevos_creditos: item.saldo_deuda_nuevos_creditos || 0.00
    }));
}
module.exports = {
    parseFactoresInfluyenScore
};