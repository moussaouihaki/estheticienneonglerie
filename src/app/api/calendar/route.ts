import { NextResponse } from "next/server";

// In production this data would come from a database.
// For now we serve the mock appointments + any blocking periods.

const APPOINTMENTS = [
    { id: "A1", client: "Marie Laurent", phone: "+41 79 123 45 67", email: "marie@email.com", service: "Signature ✨", date: `${new Date().getFullYear()}-03-10`, startHour: 10, startMin: 0, duration: 60, status: "confirmed" },
    { id: "A2", client: "Sophie Martin", phone: "+41 78 987 65 43", email: "sophie@email.com", service: "Gel-X 💎", date: `${new Date().getFullYear()}-03-10`, startHour: 13, startMin: 30, duration: 120, status: "pending", notes: "Forme amande" },
    { id: "A3", client: "Emma Dubois", phone: "+41 76 543 21 09", email: "emma@email.com", service: "Spa 🌿", date: `${new Date().getFullYear()}-03-11`, startHour: 11, startMin: 0, duration: 75, status: "confirmed" },
    { id: "A5", client: "Clara Fontaine", phone: "+41 77 234 56 78", email: "clara@email.com", service: "Signature ✨", date: `${new Date().getFullYear()}-03-12`, startHour: 9, startMin: 30, duration: 60, status: "confirmed" },
    { id: "A6", client: "Léa Bernard", phone: "+41 79 345 67 89", email: "lea@email.com", service: "Spa 🌿", date: `${new Date().getFullYear()}-03-12`, startHour: 14, startMin: 0, duration: 75, status: "confirmed" },
    { id: "A7", client: "Jade Moreau", phone: "+41 78 456 78 90", email: "jade@email.com", service: "Gel-X 💎", date: `${new Date().getFullYear()}-03-13`, startHour: 10, startMin: 30, duration: 120, status: "confirmed", notes: "French milky" },
    { id: "A8", client: "Camille Petit", phone: "+41 76 567 89 01", email: "camille@email.com", service: "Signature ✨", date: `${new Date().getFullYear()}-03-13`, startHour: 15, startMin: 0, duration: 60, status: "pending" },
    { id: "A9", client: "Inès Dupont", phone: "+41 77 678 90 12", email: "ines@email.com", service: "Spa 🌿", date: `${new Date().getFullYear()}-03-14`, startHour: 11, startMin: 30, duration: 75, status: "confirmed" },
];

function pad(n: number) { return String(n).padStart(2, "0"); }

function formatDT(date: string, hour: number, min: number) {
    // Returns YYYYMMDDTHHMMSS (local time, Europe/Zurich)
    return `${date.replace(/-/g, "")}T${pad(hour)}${pad(min)}00`;
}

function addMinutes(date: string, hour: number, min: number, duration: number) {
    const totalMin = hour * 60 + min + duration;
    const endHour = Math.floor(totalMin / 60);
    const endMin = totalMin % 60;
    return formatDT(date, endHour, endMin);
}

function icsEscape(s: string) {
    return s.replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export async function GET() {
    const lines: string[] = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Aurelia Nail Studio//FR",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:Aurelia — Rendez-vous",
        "X-WR-TIMEZONE:Europe/Zurich",
        "X-WR-CALDESC:Agenda Aurelia Nail Studio",
        "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
        "X-PUBLISHED-TTL:PT1H",
    ];

    for (const a of APPOINTMENTS) {
        if (a.status === "cancelled") continue;

        lines.push(
            "BEGIN:VEVENT",
            `UID:${a.id}@aurelianails.ch`,
            `DTSTAMP:${formatDT(new Date().toISOString().slice(0, 10), new Date().getHours(), new Date().getMinutes())}Z`,
            `DTSTART;TZID=Europe/Zurich:${formatDT(a.date, a.startHour, a.startMin)}`,
            `DTEND;TZID=Europe/Zurich:${addMinutes(a.date, a.startHour, a.startMin, a.duration)}`,
            `SUMMARY:${icsEscape(a.service)} ${icsEscape(a.client)}`,
            `DESCRIPTION:${icsEscape(`Tél: ${a.phone}\nEmail: ${a.email}${a.notes ? `\nNotes: ${a.notes}` : ""}`)}`,
            `LOCATION:Aurelia Nail Studio`,
            `STATUS:${a.status === "confirmed" ? "CONFIRMED" : "TENTATIVE"}`,
            `BEGIN:VALARM`,
            `TRIGGER:-PT60M`,
            `ACTION:DISPLAY`,
            `DESCRIPTION:Rappel RDV — ${icsEscape(a.client)}`,
            `END:VALARM`,
            "END:VEVENT",
        );
    }

    lines.push("END:VCALENDAR");

    const ics = lines.join("\r\n");

    return new NextResponse(ics, {
        status: 200,
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'inline; filename="aurelia-agenda.ics"',
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
        },
    });
}
