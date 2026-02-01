import { memo, useState } from 'react';
import { Shipment, ShipmentStatus } from '../../types';
import styles from './ShipmentTiles.module.css';

interface ShipmentTilesProps {
  shipments: Shipment[];
  onShipmentClick: (shipment: Shipment) => void;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
  canEdit: boolean;
}

interface TileMenuProps {
  shipment: Shipment;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
  canEdit: boolean;
}

function TileMenu({ shipment, onEdit, onDelete, canEdit }: TileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onEdit(shipment);
  };

  const handleFlag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsFlagged(!isFlagged);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (confirm('Are you sure you want to delete this shipment?')) {
      onDelete(shipment.id);
    }
  };

  if (!canEdit) return null;

  return (
    <div className={styles.tile__menu}>
      {isFlagged && (
        <span className={styles.tile__flagBadge} title="Flagged for attention">
          🚩
        </span>
      )}
      <button
        className={styles.tile__menuBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        ⋮
      </button>
      {isOpen && (
        <div className={styles.tile__menuDropdown}>
          <button className={styles.tile__menuItem} onClick={handleEdit}>
            ✏️ Edit
          </button>
          <button
            className={`${styles.tile__menuItem} ${isFlagged ? styles.tile__menuItemFlagged : ''}`}
            onClick={handleFlag}
          >
            {isFlagged ? '🏳️ Unflag' : '🚩 Flag'}
          </button>
          <button
            className={`${styles.tile__menuItem} ${styles['tile__menuItem--delete']}`}
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

function ShipmentTiles({ shipments, onShipmentClick, onEdit, onDelete, canEdit }: ShipmentTilesProps) {
  const getStatusClass = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.PENDING:
        return styles['tile__status--pending'];
      case ShipmentStatus.IN_TRANSIT:
        return styles['tile__status--in-transit'];
      case ShipmentStatus.DELIVERED:
        return styles['tile__status--delivered'];
      case ShipmentStatus.CANCELLED:
        return styles['tile__status--cancelled'];
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (shipments.length === 0) {
    return <div className={styles.tiles__empty}>No shipments found</div>;
  }

  return (
    <div className={styles.tiles}>
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className={styles.tile}
          onClick={() => onShipmentClick(shipment)}
        >
          <div className={styles.tile__header}>
            <div className={styles.tile__tracking}>{shipment.trackingNumber}</div>
            <TileMenu
              shipment={shipment}
              onEdit={onEdit}
              onDelete={onDelete}
              canEdit={canEdit}
            />
          </div>

          <span className={`${styles.tile__status} ${getStatusClass(shipment.status)}`}>
            {shipment.status.replace('_', ' ')}
          </span>

          <div className={styles.tile__route}>
            <div className={styles.tile__routeItem}>
              <span className={styles.tile__routeIcon}>📍</span>
              <span className={styles.tile__routeText}>{shipment.pickupLocation}</span>
              <span className={styles.tile__routeDate}>{formatDate(shipment.pickupDate)}</span>
            </div>
            <div className={styles.tile__routeItem}>
              <span className={styles.tile__routeIcon}>🎯</span>
              <span className={styles.tile__routeText}>{shipment.deliveryLocation}</span>
              <span className={styles.tile__routeDate}>{formatDate(shipment.deliveryDate)}</span>
            </div>
          </div>

          <div className={styles.tile__content}>
            <div className={styles.tile__row}>
              <span className={styles.tile__label}>Shipper</span>
              <span className={styles.tile__value}>{shipment.shipperName}</span>
            </div>
            <div className={styles.tile__row}>
              <span className={styles.tile__label}>Carrier</span>
              <span className={styles.tile__value}>{shipment.carrierName}</span>
            </div>
          </div>

          <div className={styles.tile__footer}>
            <span className={styles.tile__rate}>${shipment.rate.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ShipmentTiles);
