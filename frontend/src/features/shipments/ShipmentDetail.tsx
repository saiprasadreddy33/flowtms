import { memo } from 'react';
import { Shipment, ShipmentStatus } from '../../types';
import styles from './ShipmentDetail.module.css';

interface ShipmentDetailProps {
  shipment: Shipment;
  onClose: () => void;
}

function ShipmentDetail({ shipment, onClose }: ShipmentDetailProps) {
  const getStatusClass = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.PENDING:
        return styles['detail__status--pending'];
      case ShipmentStatus.IN_TRANSIT:
        return styles['detail__status--in-transit'];
      case ShipmentStatus.DELIVERED:
        return styles['detail__status--delivered'];
      case ShipmentStatus.CANCELLED:
        return styles['detail__status--cancelled'];
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Shipment Details</h2>
          <button className={styles.modal__close} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modal__body}>
          <span className={`${styles.detail__status} ${getStatusClass(shipment.status)}`}>
            {shipment.status.replace('_', ' ')}
          </span>

          <div className={styles.detail__section}>
            <div className={styles.detail__sectionTitle}>Tracking Information</div>
            <div className={styles.detail__grid}>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Tracking Number</span>
                <span className={styles.detail__value}>{shipment.trackingNumber}</span>
              </div>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Shipment ID</span>
                <span className={styles.detail__value}>{shipment.id}</span>
              </div>
            </div>
          </div>

          <div className={styles.detail__section}>
            <div className={styles.detail__sectionTitle}>Route</div>
            <div className={styles.detail__route}>
              <div className={styles.detail__routeItem}>
                <span className={styles.detail__routeIcon}>📍</span>
                <div className={styles.detail__routeContent}>
                  <div className={styles.detail__routeLocation}>{shipment.pickupLocation}</div>
                  <div className={styles.detail__routeDate}>
                    Pickup: {formatDate(shipment.pickupDate)}
                  </div>
                </div>
              </div>
              <div className={styles.detail__routeItem}>
                <span className={styles.detail__routeIcon}>🎯</span>
                <div className={styles.detail__routeContent}>
                  <div className={styles.detail__routeLocation}>{shipment.deliveryLocation}</div>
                  <div className={styles.detail__routeDate}>
                    Delivery: {formatDate(shipment.deliveryDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detail__section}>
            <div className={styles.detail__sectionTitle}>Parties</div>
            <div className={styles.detail__grid}>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Shipper</span>
                <span className={styles.detail__value}>{shipment.shipperName}</span>
              </div>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Carrier</span>
                <span className={styles.detail__value}>{shipment.carrierName}</span>
              </div>
            </div>
          </div>

          <div className={styles.detail__section}>
            <div className={styles.detail__sectionTitle}>Financial</div>
            <div className={styles.detail__grid}>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Rate</span>
                <span className={styles.detail__rate}>${shipment.rate.toLocaleString()}</span>
              </div>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Currency</span>
                <span className={styles.detail__value}>{shipment.currency}</span>
              </div>
            </div>
          </div>

          <div className={styles.detail__section}>
            <div className={styles.detail__sectionTitle}>Metadata</div>
            <div className={styles.detail__grid}>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Created At</span>
                <span className={styles.detail__value}>
                  {new Date(shipment.createdAt).toLocaleString()}
                </span>
              </div>
              <div className={styles.detail__field}>
                <span className={styles.detail__label}>Updated At</span>
                <span className={styles.detail__value}>
                  {new Date(shipment.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detail__footer}>
          <button className={`${styles.detail__btn} ${styles['detail__btn--secondary']}`} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ShipmentDetail);
