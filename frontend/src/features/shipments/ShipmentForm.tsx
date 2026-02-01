import { useState, useEffect } from 'react';
import { Shipment, CreateShipmentInput, UpdateShipmentInput, ShipmentStatus } from '../../types';
import styles from './ShipmentForm.module.css';

interface ShipmentFormProps {
  shipment?: Shipment | null;
  onSubmit: (data: CreateShipmentInput | UpdateShipmentInput) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export default function ShipmentForm({ shipment, onSubmit, onClose, isLoading }: ShipmentFormProps) {
  const [formData, setFormData] = useState({
    shipperName: '',
    carrierName: '',
    pickupLocation: '',
    deliveryLocation: '',
    pickupDate: '',
    deliveryDate: '',
    status: 'PENDING' as ShipmentStatus,
    rate: 0,
    currency: 'USD',
    trackingNumber: '',
  });

  useEffect(() => {
    if (shipment) {
      setFormData({
        shipperName: shipment.shipperName,
        carrierName: shipment.carrierName,
        pickupLocation: shipment.pickupLocation,
        deliveryLocation: shipment.deliveryLocation,
        pickupDate: shipment.pickupDate.split('T')[0],
        deliveryDate: shipment.deliveryDate.split('T')[0],
        status: shipment.status,
        rate: shipment.rate,
        currency: shipment.currency,
        trackingNumber: shipment.trackingNumber,
      });
    }
  }, [shipment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      pickupDate: new Date(formData.pickupDate).toISOString(),
      deliveryDate: new Date(formData.deliveryDate).toISOString(),
      rate: Number(formData.rate),
    };

    if (shipment) {
      await onSubmit({ id: shipment.id, ...submitData } as UpdateShipmentInput);
    } else {
      await onSubmit(submitData as CreateShipmentInput);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{shipment ? 'Edit Shipment' : 'Add New Shipment'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="shipperName">Shipper Name *</label>
              <input
                id="shipperName"
                name="shipperName"
                type="text"
                value={formData.shipperName}
                onChange={handleChange}
                required
                placeholder="Enter shipper name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="carrierName">Carrier Name *</label>
              <input
                id="carrierName"
                name="carrierName"
                type="text"
                value={formData.carrierName}
                onChange={handleChange}
                required
                placeholder="Enter carrier name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pickupLocation">Pickup Location *</label>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                placeholder="City, State"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="deliveryLocation">Delivery Location *</label>
              <input
                id="deliveryLocation"
                name="deliveryLocation"
                type="text"
                value={formData.deliveryLocation}
                onChange={handleChange}
                required
                placeholder="City, State"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pickupDate">Pickup Date *</label>
              <input
                id="pickupDate"
                name="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="deliveryDate">Delivery Date *</label>
              <input
                id="deliveryDate"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="PENDING">Pending</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="trackingNumber">Tracking Number *</label>
              <input
                id="trackingNumber"
                name="trackingNumber"
                type="text"
                value={formData.trackingNumber}
                onChange={handleChange}
                required
                placeholder="TRK00000000"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rate">Rate *</label>
              <input
                id="rate"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="currency">Currency *</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Saving...' : shipment ? 'Update Shipment' : 'Create Shipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
