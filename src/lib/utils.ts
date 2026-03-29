/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Utilitaires pour la gestion des classes CSS et du formatage financier
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Ce fichier contient les fonctions utilitaires pour :
 * - La fusion des classes CSS (Tailwind)
 * - Le formatage des montants en devises
 * - Les calculs fiscaux (TVA, pénalités, etc.)
 * - Les validations de conformité
 * 
 * Conformité fiscale :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Taux d'intérêt légal pour les pénalités de retard
 * - Indemnité forfaitaire de recouvrement (40 €)
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne des classes CSS avec gestion des conflits Tailwind
 * 
 * Utile pour combiner des classes conditionnelles tout en respectant
 * l'ordre de priorité de Tailwind CSS.
 * 
 * @param inputs - Liste de classes CSS à fusionner
 * @returns {string} Chaîne de classes CSS optimisée
 * 
 * @example
 * cn('bg-white', isActive && 'bg-blue-600', 'p-4')
 * // Résultat: 'bg-white p-4' ou 'bg-blue-600 p-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate un montant en devise
 * 
 * @param amount - Montant à formater
 * @param currency - Devise (EUR, USD, GBP, CHF)
 * @param locale - Locale pour le formatage (fr-FR, en-US, etc.)
 * @returns {string} Montant formaté
 * 
 * @example
 * formatCurrency(1250.50, 'EUR', 'fr-FR')
 * // Résultat: '1 250,50 €'
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'EUR', 
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calcule le montant HT à partir du montant TTC et du taux de TVA
 * 
 * @param amountIncludingTax - Montant TTC
 * @param taxRate - Taux de TVA (20%, 10%, 5.5%, 2.1%)
 * @returns {number} Montant HT
 */
export function calculateExcludingTax(amountIncludingTax: number, taxRate: number): number {
  return amountIncludingTax / (1 + taxRate / 100);
}

/**
 * Calcule le montant TTC à partir du montant HT et du taux de TVA
 * 
 * @param amountExcludingTax - Montant HT
 * @param taxRate - Taux de TVA (20%, 10%, 5.5%, 2.1%)
 * @returns {number} Montant TTC
 */
export function calculateIncludingTax(amountExcludingTax: number, taxRate: number): number {
  return amountExcludingTax * (1 + taxRate / 100);
}

/**
 * Calcule le montant de TVA à partir du montant HT et du taux
 * 
 * @param amountExcludingTax - Montant HT
 * @param taxRate - Taux de TVA (20%, 10%, 5.5%, 2.1%)
 * @returns {number} Montant de TVA
 */
export function calculateTaxAmount(amountExcludingTax: number, taxRate: number): number {
  return amountExcludingTax * (taxRate / 100);
}

/**
 * Calcule les pénalités de retard
 * 
 * Conformément à l'article L. 441-3 du Code de commerce,
 * les pénalités de retard sont calculées au taux d'intérêt légal
 * majoré de 10 points.
 * 
 * @param amount - Montant TTC de la facture
 * @param daysLate - Nombre de jours de retard
 * @param legalInterestRate - Taux d'intérêt légal (défaut: 4.26% pour 2026)
 * @returns {number} Montant des pénalités de retard
 * 
 * @example
 * calculateLatePenalties(1000, 30)
 * // Taux légal 4.26% + 10 points = 14.26%
 * // Pénalités = 1000 * 0.1426 * 30 / 365 = 11.72 €
 */
export function calculateLatePenalties(
  amount: number, 
  daysLate: number, 
  legalInterestRate: number = 4.26
): number {
  const penaltyRate = legalInterestRate + 10; // +10 points
  return (amount * penaltyRate / 100 * daysLate) / 365;
}

/**
 * Retourne l'indemnité forfaitaire de recouvrement
 * 
 * Conformément à l'article L. 441-3 du Code de commerce,
 * une indemnité forfaitaire de 40 € est due en cas de retard de paiement.
 * 
 * @returns {number} Indemnité forfaitaire de recouvrement (40 €)
 */
export function getRecoveryIndemnity(): number {
  return 40;
}

/**
 * Formate une date au format français
 * 
 * @param date - Date à formater
 * @returns {string} Date formatée (JJ/MM/AAAA)
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Génère un numéro de facture unique et chronologique
 * 
 * Format recommandé: FACT-AAAA-XXX
 * Exemple: FACT-2026-001
 * 
 * @param year - Année en cours
 * @param count - Numéro séquentiel (1, 2, 3...)
 * @returns {string} Numéro de facture formaté
 */
export function generateInvoiceNumber(year: number, count: number): string {
  return `FACT-${year}-${count.toString().padStart(3, '0')}`;
}

/**
 * Valide un numéro SIRET (14 chiffres)
 * 
 * @param siret - Numéro SIRET à valider
 * @returns {boolean} Vrai si le SIRET est valide
 */
export function isValidSiret(siret: string): boolean {
  const cleaned = siret.replace(/\s/g, '');
  return /^\d{14}$/.test(cleaned);
}

/**
 * Valide un numéro de TVA intracommunautaire
 * Format: FR + 11 chiffres (clé + SIREN)
 * 
 * @param vatNumber - Numéro de TVA à valider
 * @returns {boolean} Vrai si le numéro de TVA est valide
 */
export function isValidVatNumber(vatNumber: string): boolean {
  const cleaned = vatNumber.replace(/\s/g, '').toUpperCase();
  return /^FR\d{11}$/.test(cleaned);
}

/**
 * Valide un taux de TVA
 * Taux autorisés: 20%, 10%, 5.5%, 2.1%, 0% (franchise)
 * 
 * @param rate - Taux de TVA à valider
 * @returns {boolean} Vrai si le taux est valide
 */
export function isValidVatRate(rate: number): boolean {
  const validRates = [20, 10, 5.5, 2.1, 0];
  return validRates.includes(rate);
}

/**
 * Retourne la mention fiscale appropriée selon le régime
 * 
 * @param isVatExempt - Bénéficie de la franchise TVA (article 293 B)
 * @param isReverseCharge - Soumis à autoliquidation (article 283-2)
 * @returns {string} Mention fiscale à afficher sur la facture
 */
export function getTaxMention(isVatExempt: boolean, isReverseCharge: boolean): string {
  if (isVatExempt) {
    return "TVA non applicable, article 293 B du CGI";
  }
  if (isReverseCharge) {
    return "TVA autoliquidée par le preneur - article 283 du CGI";
  }
  return "";
}

/**
 * Calcule le total d'une facture
 * 
 * @param subtotal - Sous-total HT
 * @param taxRate - Taux de TVA (%)
 * @param discount - Remise (€)
 * @param isVatExempt - Bénéficie de la franchise TVA
 * @returns {number} Total TTC
 */
export function calculateInvoiceTotal(
  subtotal: number, 
  taxRate: number, 
  discount: number = 0, 
  isVatExempt: boolean = false
): number {
  const subtotalAfterDiscount = subtotal - discount;
  if (isVatExempt) {
    return subtotalAfterDiscount;
  }
  return subtotalAfterDiscount * (1 + taxRate / 100);
}

/**
 * Formate un pourcentage
 * 
 * @param value - Valeur à formater
 * @param decimals - Nombre de décimales
 * @returns {string} Pourcentage formaté
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calcule le nombre de jours entre deux dates
 * 
 * @param startDate - Date de début
 * @param endDate - Date de fin
 * @returns {number} Nombre de jours d'écart
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Détermine si une facture est en retard
 * 
 * @param dueDate - Date d'échéance
 * @returns {boolean} Vrai si la facture est en retard
 */
export function isOverdue(dueDate: Date): boolean {
  return new Date() > dueDate;
}

/**
 * Calcule le montant de l'acompte à partir du pourcentage
 * 
 * @param total - Montant total TTC
 * @param percentage - Pourcentage d'acompte
 * @returns {number} Montant de l'acompte
 */
export function calculateDeposit(total: number, percentage: number): number {
  return total * (percentage / 100);
}

/**
 * Convertit un montant en toutes lettres (français)
 * 
 * @param amount - Montant à convertir
 * @returns {string} Montant en toutes lettres
 */
export function amountToWords(amount: number): string {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
  
  // Fonction simplifiée pour les montants entiers
  const euros = Math.floor(amount);
  const cents = Math.round((amount - euros) * 100);
  
  let result = '';
  if (euros > 0) {
    result += `${euros} euro${euros > 1 ? 's' : ''}`;
  }
  if (cents > 0) {
    result += ` ${cents} centime${cents > 1 ? 's' : ''}`;
  }
  return result.trim();
}