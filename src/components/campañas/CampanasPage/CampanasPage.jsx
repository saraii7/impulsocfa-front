import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserCampaigns, suspendCampaign } from "../../../services/campaign.service";

export default function CampanasPage() {
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);

                const campaigns = await getUserCampaigns(user.id);
                setCampaigns(campaigns);
            } catch (err) {
                console.error(err);
                alert(err.message);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que quieres suspender esta campaña?")) return;
        try {
            await suspendCampaign(id);
            alert("Campaña suspendida con éxito");
            setCampaigns(campaigns.filter((c) => c.id_campana !== id));
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleEdit = (id) => navigate(`/editarcampana/${id}`);

    return (
        <PageContainer>
            <Header>
                <h1>Mis campañas</h1>
                <CreateButton onClick={() => navigate("/crearcampana")}>
                    Crear campaña
                </CreateButton>
            </Header>

            {loading ? (
                <p>Cargando campañas...</p>
            ) : campaigns.length === 0 ? (
                <p>No tienes campañas creadas.</p>
            ) : (
                <CampaignList>
                    {campaigns.map((c) => (
                        <CampaignCard key={c.id_campana}>
                            <h3>{c.titulo}</h3>
                            <p>{c.descripcion}</p>
                            <p>Monto objetivo: ${c.monto_objetivo} | Duración: {c.tiempo_objetivo} días</p>
                            {c.foto_principal && <img src={c.foto_principal} alt={c.titulo} />}
                            <ButtonGroup>
                                <ActionButton onClick={() => handleEdit(c.id_campana)}>Editar</ActionButton>
                                <DeleteButton onClick={() => handleDelete(c.id_campana)}>Suspender</DeleteButton>
                            </ButtonGroup>
                        </CampaignCard>
                    ))}
                </CampaignList>
            )}
        </PageContainer>
    );
}

const PageContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2rem;
    color: #333;
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(45deg, rgba(107,16,211,1) 0%, rgb(18,177,209) 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

const CampaignList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const CampaignCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);

  h3 { font-size: 1.3rem; margin-bottom: 10px; color: #333; }
  p { font-size: 0.9rem; color: #555; }
  img { margin-top: 10px; width: 100%; border-radius: 15px; }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  background: #12b1d1;
  color: white;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  border: none;

  &:hover { background: #0f96b5; }
`;

const DeleteButton = styled.button`
  background: #d11616;
  color: white;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  border: none;

  &:hover { background: #a50f0f; }
`;
