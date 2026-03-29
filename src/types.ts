/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Définitions des types TypeScript pour l'application
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Ce fichier contient toutes les interfaces et types utilisés
 * dans l'application InvoiceGEN pour garantir la cohérence
 * des données et la conformité fiscale.
 * 
 * Conformité fiscale :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Réforme de la facturation électronique 2026
 */

/**
 * Types de template disponibles pour l'affichage des factures
 * 
 * Chaque template offre un style visuel différent :
 * - minimalist : design épuré et professionnel
 * - corporate : style entreprise avec en-tête coloré
 * - modern : design contemporain avec éléments graphiques
 * - credit_note : style spécifique pour les avoirs (fond rose)
 */
export type TemplateType = 'minimalist' | 'corporate' | 'modern' | 'credit_note';

/**
 * Types de documents pris en charge par l'application
 * 
 * - invoice : facture standard (type principal)
 * - credit_note : avoir / note de crédit
 * - quote : devis (peut être converti en facture)
 * - purchase_order : bon de commande
 */
export type DocumentType = 'invoice' | 'credit_note' | 'quote' | 'purchase_order';

/**
 * Article / Ligne de facture
 * 
 * Représente une ligne de prestation ou de produit sur la facture.
 * Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce,
 * chaque article doit inclure une description précise, une quantité,
 * un prix unitaire et un taux de TVA applicable.
 */
export interface InvoiceItem {
  /** Identifiant unique de l'article (généré automatiquement) */
  id: string;
  
  /** Description détaillée du produit ou service (mention obligatoire) */
  description: string;
  
  /** Quantité (nombre d'unités, heures, etc.) */
  quantity: number;
  
  /** Prix unitaire hors taxes (HT) */
  unitPrice: number;
  
  /** 
   * Taux de TVA applicable à l'article
   * Valeurs possibles : 20% (normal), 10% (intermédiaire), 
   * 5.5% (réduit), 2.1% (super-réduit), 0% (franchise TVA)
   */
  vatRate?: number;
}

/**
 * Informations client
 * 
 * Contient toutes les coordonnées du client nécessaires pour la facturation.
 * Conformément à l'article L. 441-3 du Code de commerce, ces informations
 * sont obligatoires sur toute facture professionnelle.
 */
export interface Client {
  /** Nom ou raison sociale du client (obligatoire) */
  name: string;
  
  /** Adresse email du client (pour l'envoi de la facture) */
  email: string;
  
  /** Adresse postale complète (obligatoire) */
  address: string;
  
  /** 
   * Numéro SIRET (14 chiffres) - Obligatoire pour les clients professionnels
   * Permet l'identification unique dans l'annuaire central
   */
  siret?: string;
  
  /** 
   * Numéro de TVA intracommunautaire (format FR + 11 chiffres)
   * Obligatoire pour les opérations transfrontalières
   * Validation possible via le système VIES
   */
  vatNumber?: string;
}

/**
 * Profil utilisateur / Entreprise
 * 
 * Informations de l'entreprise émettrice des factures.
 * Ces données sont utilisées pour remplir automatiquement
 * les mentions légales obligatoires sur chaque facture.
 */
export interface UserProfile {
  /** Nom de l'entreprise (obligatoire) */
  companyName: string;
  
  /** Email professionnel de contact */
  email: string;
  
  /** Adresse du siège social (obligatoire) */
  address: string;
  
  /** Numéro de téléphone professionnel */
  phone: string;
  
  /** 
   * Numéro SIRET (14 chiffres) - Obligatoire
   * Identifiant unique de l'entreprise
   */
  siret: string;
  
  /** 
   * RIB / IBAN bancaire
   * Informations nécessaires pour les virements clients
   */
  rib: string;
  
  /** URL du logo de l'entreprise (optionnel) */
  logoUrl?: string;
  
  /** 
   * Numéro de TVA intracommunautaire (format FR + 11 chiffres)
   * Obligatoire pour les opérations transfrontalières
   * Permet la validation VIES
   */
  vatNumber?: string;
}

/**
 * Facture / Document
 * 
 * Représente une facture complète avec toutes ses informations.
 * Conforme aux exigences de l'article L. 441-3 du Code de commerce
 * et aux dispositions du Code général des impôts.
 * 
 * Mentions obligatoires intégrées :
 * - Numéro unique et chronologique (invoiceNumber)
 * - Date d'émission (date)
 * - Date d'échéance (dueDate)
 * - Coordonnées du client (client)
 * - Coordonnées du vendeur (via UserProfile)
 * - Description des prestations (items)
 * - Taux et montant de TVA (taxRate)
 * - Conditions de paiement (dueDate, notes)
 * - Pénalités de retard (calculées automatiquement)
 * - Indemnité forfaitaire de recouvrement (40 €)
 */
export interface Invoice {
  /** Identifiant unique de la facture (UUID) */
  id: string;
  
  /** 
   * Numéro de facture unique et chronologique
   * Format recommandé : FACT-AAAA-XXX
   * Exemple : FACT-2026-001
   */
  invoiceNumber: string;
  
  /** Date d'émission de la facture (format YYYY-MM-DD) */
  date: string;
  
  /** Date d'échéance de paiement (format YYYY-MM-DD) */
  dueDate: string;
  
  /** Informations du client (obligatoires) */
  client: Client;
  
  /** Liste des articles / prestations */
  items: InvoiceItem[];
  
  /** 
   * Taux de TVA global applicable
   * Valeurs possibles : 20, 10, 5.5, 2.1, 0 (franchise)
   */
  taxRate: number;
  
  /** 
   * Remise en euros (montant déduit du sous-total HT)
   * Optionnel, défaut 0
   */
  discount: number;
  
  /** Devise de facturation (EUR, USD, GBP, etc.) */
  currency: string;
  
  /** Statut de la facture */
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  
  /** Type de document (facture, avoir, devis, bon de commande) */
  type: DocumentType;
  
  /** Template d'affichage choisi */
  template: TemplateType;
  
  /** 
   * Notes complémentaires
   * Peut contenir les conditions de paiement, les pénalités de retard,
   * l'indemnité forfaitaire de recouvrement, etc.
   */
  notes?: string;
  
  /** 
   * Indicateur de franchise en base de TVA (article 293 B du CGI)
   * Si true, la mention "TVA non applicable, article 293 B du CGI"
   * est automatiquement ajoutée sur la facture.
   */
  vatExempt?: boolean;
  
  /** 
   * Indicateur d'autoliquidation (reverse charge)
   * Si true, la mention "TVA autoliquidée par le preneur - article 283 du CGI"
   * est automatiquement ajoutée sur la facture.
   * Applicable aux prestations intracommunautaires et travaux BTP.
   */
  reverseCharge?: boolean;
}

/**
 * Statistiques du tableau de bord
 * 
 * Indicateurs clés pour le suivi de l'activité de facturation.
 * Ces métriques permettent d'évaluer la santé financière de l'entreprise.
 */
export interface DashboardStats {
  /** Chiffre d'affaires total des factures payées */
  totalRevenue: number;
  
  /** Montant total des factures en attente de paiement */
  pendingAmount: number;
  
  /** Nombre de factures payées */
  paidInvoices: number;
  
  /** Nombre de factures en retard de paiement */
  overdueInvoices: number;
}

// ============================================
// CONSTANTES ET UTILITAIRES POUR LA CONFORMITÉ
// ============================================

/**
 * Taux de TVA légaux en France pour 2026
 * 
 * Ces taux sont conformes à la législation fiscale en vigueur :
 * - 20% : taux normal (majorité des biens et services)
 * - 10% : taux intermédiaire (restauration, transports, hôtels)
 * - 5.5% : taux réduit (énergie, livres, produits de première nécessité)
 * - 2.1% : taux super-réduit (presse, médicaments remboursables)
 * - 0% : franchise TVA (article 293 B du CGI)
 */
export const VAT_RATES = {
  STANDARD: 20,
  INTERMEDIATE: 10,
  REDUCED: 5.5,
  SUPER_REDUCED: 2.1,
  EXEMPT: 0
} as const;

/**
 * Taux d'intérêt légal 2026
 * 
 * Source : Banque de France
 * Applicable pour le calcul des pénalités de retard
 * (article L. 441-3 du Code de commerce)
 */
export const LEGAL_INTEREST_RATE_2026 = 4.26;

/**
 * Indemnité forfaitaire de recouvrement
 * 
 * Montant automatiquement dû en cas de retard de paiement
 * (article L. 441-3 du Code de commerce)
 */
export const RECOVERY_INDEMNITY_AMOUNT = 40;

/**
 * Taux de pénalité de retard
 * 
 * Calcul : taux d'intérêt légal + 10 points
 * Exemple pour 2026 : 4.26% + 10% = 14.26%
 */
export const LATE_PAYMENT_PENALTY_RATE = LEGAL_INTEREST_RATE_2026 + 10;

/**
 * Seuils de franchise en base de TVA (article 293 B du CGI)
 * 
 * Valeurs pour l'année 2026 :
 * - Services et professions libérales : 91 900 €
 * - Commerce et hébergement : 94 300 €
 */
export const VAT_EXEMPTION_THRESHOLDS = {
  SERVICES: 91900,
  COMMERCE: 94300
} as const;

/**
 * Format de numéro de facture recommandé
 * 
 * Structure : FACT-AAAA-XXX
 * - AAAA : année en cours
 * - XXX : numéro séquentiel (3 chiffres)
 * 
 * Exemple : FACT-2026-001
 */
export const INVOICE_NUMBER_FORMAT = 'FACT-YYYY-XXX';

/**
 * Format de numéro de TVA intracommunautaire
 * 
 * Structure : FR + 11 chiffres
 * - FR : code pays
 * - 11 chiffres : clé (2 chiffres) + SIREN (9 chiffres)
 * 
 * Exemple : FR12345678901
 */
export const VAT_NUMBER_FORMAT = /^FR\d{11}$/;

/**
 * Format de numéro SIRET
 * 
 * Structure : 14 chiffres
 * - 9 chiffres : SIREN
 * - 5 chiffres : NIC (numéro interne de classement)
 * 
 * Exemple : 12345678900012
 */
export const SIRET_FORMAT = /^\d{14}$/;