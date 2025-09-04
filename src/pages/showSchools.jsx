import { useEffect, useState } from "react";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    useEffect(() => {
        fetch("/api/getSchools")
            .then((res) => {
                debugger
                if (!res.ok) throw new Error("Failed to fetch schools");
                return res.json();
            })
            .then((data) => setSchools(data))
            .catch((err) => console.error(" API Error:", err));
    }, []);

    const styles = {
        page: {
            minHeight: "85vh",
            padding: "40px",
            fontFamily: "Arial, sans-serif",
        },
        title: {
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "24px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
        },
        card: {
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
        },
        image: {
            width: "100%",
            height: "180px",
            objectFit: "cover",
        },
        content: {
            padding: "15px",
        },
        schoolName: {
            margin: "0 0 10px",
            color: "#222",
            fontSize: "18px",
        },
        address: {
            margin: "0 0 5px",
            color: "#555",
            fontSize: "14px",
        },
        city: {
            margin: 0,
            color: "#777",
            fontSize: "13px",
        },
    };

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>📚 Our Schools</h2>

            <div style={styles.grid}>
                {schools.length === 0 ? (
                    <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                        No schools found!
                    </p>
                ) : (
                    schools.map((school) => (
                        <div
                            key={school.id}
                            style={styles.card}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 20px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 6px 15px rgba(0,0,0,0.1)";
                            }}
                        >
                            <img
                                src={school.image}
                                alt={school.name}
                                style={styles.image}
                            />
                            <div style={styles.content}>
                                <h3 style={styles.schoolName}>{school.name}</h3>
                                <p style={styles.address}>{school.address}</p>
                                <p style={styles.city}>📍 {school.city}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
