export default function Timeline() {
  const [selected, setSelected] = useState<TimelineItem | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function getTimeline() {
      try {
        const res = await fetch("/api/timeline");
        const data = await res.json();
        setTimeline(data);
      } catch (err) {
        console.error("Error loading timeline", err);
      } finally {
        setLoading(false);
      }
    }

    getTimeline();
  }, []); // ← important

  // Now UI logic goes OUTSIDE useEffect:
  const upcomingEvents = timeline.filter((e) => e.year > currentYear);
  const recentUpcomingYear = upcomingEvents.length
    ? upcomingEvents[0].year
    : null;

  const progressPercent =
    (timeline.filter((e) => e.year <= currentYear).length / timeline.length) *
    100;

  return (
    <section> ... the rest of your JSX ... </section>
  );
}
