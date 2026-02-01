import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useShipments, useDeleteShipment, useAddShipment, useUpdateShipment } from '../../hooks/useShipments';
import { Shipment, ShipmentStatus, CreateShipmentInput, UpdateShipmentInput } from '../../types';
import ShipmentGrid from './ShipmentGrid';
import ShipmentTiles from './ShipmentTiles';
import ShipmentDetail from './ShipmentDetail';
import ShipmentForm from './ShipmentForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './Shipments.module.css';

type ViewMode = 'grid' | 'tiles';

export default function Shipments() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('ASC');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [carrierFilter, setCarrierFilter] = useState<string>('');
  const [pickupLocationFilter, setPickupLocationFilter] = useState<string>('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  const { data, loading, refetch } = useShipments({
    page,
    limit,
    sortField: sortField || undefined,
    sortDirection: sortDirection || undefined,
    status: statusFilter || undefined,
    carrierName: carrierFilter || undefined,
    pickupLocation: pickupLocationFilter || undefined,
  });

  const { deleteShipment } = useDeleteShipment();
  const { addShipment, loading: addLoading } = useAddShipment();
  const { updateShipment, loading: updateLoading } = useUpdateShipment();

  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      // Cycle: ASC → DESC → default (no sort)
      if (sortDirection === 'DESC') {
        setSortDirection('ASC');
      } else if (sortDirection === 'ASC') {
        setSortField('');
        setSortDirection('ASC');
      } else {
        setSortDirection('DESC');
      }
    } else {
      // First click on new column: start with DESC
      setSortField(field);
      setSortDirection('DESC');
    }
  }, [sortField, sortDirection]);

  const handleDelete = async (id: string) => {
    try {
      await deleteShipment(id);
      refetch();
    } catch (error) {
      alert('Failed to delete shipment');
    }
  };

  const handleEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingShipment(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: CreateShipmentInput | UpdateShipmentInput) => {
    try {
      if ('id' in data) {
        await updateShipment(data);
      } else {
        await addShipment(data);
      }
      setShowForm(false);
      setEditingShipment(null);
      refetch();
    } catch (error) {
      alert('Failed to save shipment');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingShipment(null);
  };

  useEffect(() => {
    refetch();
  }, [page, sortField, sortDirection, statusFilter, carrierFilter, pickupLocationFilter, refetch]);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const canEdit = user?.role === 'admin';
  const today = new Date();
  const formatTime = (timeZone: string) =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    });

  const formatDate = (timeZone: string) =>
    new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone,
    });

  const clocks = [
    { label: 'Pacific - Los Angeles', timeZone: 'America/Los_Angeles' },
    { label: 'Mountain - Denver', timeZone: 'America/Denver' },
    { label: 'Central - Dallas', timeZone: 'America/Chicago' },
    { label: 'Eastern - New York', timeZone: 'America/New_York' },
    { label: 'Europe - London', timeZone: 'Europe/London' },
  ];

  const quickActions = [
    { title: 'Onboard Carrier', text: 'Add a new carrier to your network', icon: '🧩' },
    { title: 'Invite Shipper', text: 'Send a shipper invitation', icon: '📨' },
    { title: 'Create Quote', text: 'Generate a rate proposal', icon: '💸' },
    { title: 'Create Load', text: 'Book a new shipment', icon: '🚚' },
  ];

  const metrics = [
    { label: 'Total Loads Booked', value: '156', delta: '+7.4%' },
    { label: 'Total Revenue', value: '$128,400', delta: '+3.1%' },
    { label: 'Gross Margin ($)', value: '$18,240', delta: '-0.9%' },
    { label: 'Gross Margin (%)', value: '14.2%', delta: '+0.5%' },
    { label: 'Avg Margin / Load', value: '$117', delta: '+1.2%' },
  ];

  const liveOps = [
    { label: 'Loads In Transit', value: '47' },
    { label: 'Pickups Today', value: '23' },
    { label: 'Deliveries Today', value: '18' },
    { label: 'Loads at Risk', value: '5' },
    { label: 'Unread Chats', value: '12' },
  ];

  const marketPulse = [
    { lane: 'Los Angeles → Dallas', rate: '$2.36/mi', trend: '+0.3%' },
    { lane: 'Chicago → Atlanta', rate: '$2.34/mi', trend: '+0.1%' },
    { lane: 'Seattle → Phoenix', rate: '$2.95/mi', trend: '-0.2%' },
  ];

  const messages = [
    { title: 'Swift Transport Co.', meta: 'Inbound containers pickup', time: '15m ago' },
    { title: 'Atlantic Freight', meta: 'Chicago route update', time: '18m ago' },
    { title: 'Midwest Carriers', meta: 'New capacity request', time: '23m ago' },
    { title: 'Pacific Shipping', meta: 'Pickup rescheduled', time: '29m ago' },
  ];

  const notifications = [
    { title: 'Load HA652 delayed at pickup', meta: '2 min ago', tone: 'warning' },
    { title: 'Carrier approved for lane CH-LA', meta: '1 hour ago', tone: 'success' },
    { title: 'Rate update: spot rates increased', meta: '3 hours ago', tone: 'info' },
    { title: 'Reminder: 3 loads need carrier assignment', meta: '1 day ago', tone: 'danger' },
  ];

  return (
    <div className={styles.shipments}>
      <div className={styles.dashboardHeader} data-reveal>
        <div>
          <div className={styles.dashboardKicker}>Operations Overview</div>
          <h1 className={styles.dashboardTitle}>FlowTMS Command Center</h1>
          <p className={styles.dashboardSubtitle}>
            Real-time visibility across loads, carriers, and exceptions.
          </p>
        </div>
        <div className={styles.dashboardControls}>
          <div className={styles.dashboardDate}>
            <span>Today</span>
            <strong className={styles.dashboardDateValue}>
              {today.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </strong>
          </div>
          <select className={styles.dashboardSelect}>
            <option>This week</option>
            <option>Last 30 days</option>
            <option>Quarter to date</option>
          </select>
          <button className={styles.primaryBtn} onClick={handleAddNew}>Create Load</button>
        </div>
      </div>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>World Clocks</h2>
          <span className={styles.sectionMeta}>Live regional coverage</span>
        </div>
        <div className={styles.clockGrid}>
          {clocks.map((clock) => (
            <div key={clock.label} className={styles.clockCard}>
              <div className={styles.clockCity}>{clock.label}</div>
              <div className={styles.clockTime}>{formatTime(clock.timeZone)}</div>
              <div className={styles.clockDate}>{formatDate(clock.timeZone)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <span className={styles.sectionMeta}>One click workflows</span>
        </div>
        <div className={styles.quickActions}>
          {quickActions.map((action) => (
            <button
              key={action.title}
              className={styles.quickCard}
              onClick={action.title === 'Create Load' ? handleAddNew : undefined}
            >
              <span className={styles.quickCardIcon}>{action.icon}</span>
              <span className={styles.quickCardTitle}>{action.title}</span>
              <span className={styles.quickCardText}>{action.text}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Today at a Glance</h2>
          <span className={styles.sectionMeta}>Performance snapshot</span>
        </div>
        <div className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <div key={metric.label} className={styles.metricCard}>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div
                className={`${styles.metricTrend} ${
                  metric.delta.startsWith('-')
                    ? styles.metricDeltaDown
                    : styles.metricDeltaUp
                }`}
              >
                {metric.delta}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Live Operations Snapshot</h2>
          <span className={styles.sectionMeta}>Live feed indicators</span>
        </div>
        <div className={styles.opsGrid}>
          {liveOps.map((item) => (
            <div key={item.label} className={styles.opsCard}>
              <div className={styles.opsValue}>{item.value}</div>
              <div className={styles.opsLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.dashboardSplit} data-reveal>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <div className={styles.panelTitle}>Market Pulse</div>
              <div className={styles.panelSubtitle}>Top lanes today</div>
            </div>
            <button className={styles.panelAction}>View market</button>
          </div>
          <div className={styles.list}>
            {marketPulse.map((lane) => (
              <div key={lane.lane} className={styles.listItem}>
                <div className={styles.listItemMain}>
                  <div className={styles.listItemTitle}>{lane.lane}</div>
                  <div className={styles.listItemMeta}>Spot rate</div>
                </div>
                <div className={styles.listItemEnd}>
                  <div className={styles.listItemValue}>{lane.rate}</div>
                  <span className={styles.pill}>{lane.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <div className={styles.panelTitle}>Messages</div>
              <div className={styles.panelSubtitle}>Carrier conversations</div>
            </div>
            <button className={styles.panelAction}>New chat</button>
          </div>
          <div className={styles.list}>
            {messages.map((message) => (
              <div key={message.title} className={styles.listItem}>
                <div className={styles.listItemMain}>
                  <div className={styles.listItemTitle}>{message.title}</div>
                  <div className={styles.listItemMeta}>{message.meta}</div>
                </div>
                <div className={styles.listItemEnd}>
                  <span className={styles.listItemTime}>{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <div className={styles.panelTitle}>Notifications</div>
              <div className={styles.panelSubtitle}>Operational alerts</div>
            </div>
            <button className={styles.panelAction}>View all</button>
          </div>
          <div className={styles.list}>
            {notifications.map((note) => (
              <div key={note.title} className={styles.listItem}>
                <div className={styles.listItemMain}>
                  <div className={styles.listItemTitle}>{note.title}</div>
                  <div className={styles.listItemMeta}>{note.meta}</div>
                </div>
                <div className={styles.listItemEnd}>
                  <span
                    className={`${styles.pill} ${
                      note.tone === 'warning'
                        ? styles.pillWarning
                        : note.tone === 'success'
                        ? styles.pillSuccess
                        : note.tone === 'danger'
                        ? styles.pillDanger
                        : styles.pillInfo
                    }`}
                  >
                    {note.tone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.shipmentsSection} data-reveal>
        <div className={styles.shipmentsHeader}>
          <div>
            <h2 className={styles.shipmentsTitle}>Shipments Workspace</h2>
            <p className={styles.shipmentsSubtitle}>Track, filter, and manage every shipment.</p>
          </div>
          <div className={styles.shipmentsActions}>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'tiles' ? styles.viewBtnActive : ''}`}
                onClick={() => setViewMode('tiles')}
              >
                Tiles
              </button>
            </div>
            <button className={styles.addBtn} onClick={handleAddNew}>+ Add Shipment</button>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.filter}>
            <label className={styles.filterLabel}>Status</label>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              {Object.values(ShipmentStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filter}>
            <label className={styles.filterLabel}>Carrier</label>
            <input
              className={styles.filterInput}
              type="text"
              placeholder="Search carrier..."
              value={carrierFilter}
              onChange={(e) => {
                setCarrierFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className={styles.filter}>
            <label className={styles.filterLabel}>Pickup Location</label>
            <input
              className={styles.filterInput}
              type="text"
              placeholder="Search location..."
              value={pickupLocationFilter}
              onChange={(e) => {
                setPickupLocationFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className={styles.content}>
          {loading ? (
            <LoadingSpinner />
          ) : viewMode === 'grid' ? (
            <ShipmentGrid
              shipments={data?.shipments || []}
              onShipmentClick={setSelectedShipment}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          ) : (
            <ShipmentTiles
              shipments={data?.shipments || []}
              onShipmentClick={setSelectedShipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={canEdit}
            />
          )}

          {data && data.shipments.length > 0 && (
            <div className={styles.pagination}>
              <div className={styles.paginationLeft}>
                <div className={styles.paginationInfo}>
                  Showing <span className={styles.paginationRange}>{(page - 1) * limit + 1}</span> - <span className={styles.paginationRange}>{Math.min(page * limit, data.total)}</span> of <span className={styles.paginationTotal}>{data.total}</span>
                </div>
                <div className={styles.paginationLimitSelector}>
                  <label htmlFor="limit-select" className={styles.limitLabel}>Items per page:</label>
                  <select
                    id="limit-select"
                    className={styles.limitSelect}
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className={styles.paginationControls}>
                <button
                  className={styles.paginationBtn}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  title="Previous page"
                >
                  ← Prev
                </button>
                <div className={styles.paginationPage}>
                  <span className={styles.pageNumber}>{page}</span>
                  <span className={styles.pageTotal}>of {data.totalPages}</span>
                </div>
                <button
                  className={styles.paginationBtn}
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page >= data.totalPages}
                  title="Next page"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedShipment && (
        <ShipmentDetail shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />
      )}

      {showForm && (
        <ShipmentForm
          shipment={editingShipment}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          isLoading={addLoading || updateLoading}
        />
      )}
    </div>
  );
}
