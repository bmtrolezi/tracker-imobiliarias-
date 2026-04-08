import { useState, useEffect, useMemo } from "react";
import { supabase } from "./supabase";

var ALL_DATA = [
  { id: 1, pri: "A", ordem: 1, nome: "R2 Flats", tel: "(11) 3388-5151", dist: "1.0km", bairro: "Moema", endereco: "Av. Jandira, 257, cj. 111 - Moema", foco: "Flats/Studios", insta: "r2flats_", site: "r2flats.com.br", creci: "23488-J-SP", rating: "--", avaliacoes: "--", descricao: "Especialista em flats desde 2012. ~994 imoveis no ZAP. Foco 100% compactos.", motivo: "TOP 1. Foco 100% flats/studios, core Moema, desde 2012." },
  { id: 2, pri: "A", ordem: 2, nome: "Adriano Silva Imoveis", tel: "(11) 5053-1790", dist: "1.2km", bairro: "Moema", endereco: "Av. Moema, 765 - Moema", foco: "Zona Sul 15+ anos", insta: "adrianosilvaimoveis", site: "adrianosilvaimoveis.com.br", creci: "20280", rating: "4.6", avaliacoes: "5", descricao: "15+ anos Moema. 11-50 func. Juridico proprio. Tem imovel na Al. Anapurus.", motivo: "TOP 2. Maior estrutura local, 15+ anos." },
  { id: 3, pri: "A", ordem: 3, nome: "MJ Imoveis", tel: "(11) 5051-9563", dist: "1.3km", bairro: "Moema", endereco: "Av. Sabia, 205 - Moema", foco: "Moema 39 anos", insta: "mjimoveisoficial", site: "mjimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Desde 1986 (39 anos). 2a geracao familiar.", motivo: "39 anos de Moema. Micro, 2a geracao." },
  { id: 4, pri: "A", ordem: 4, nome: "Coelho e Lima", tel: "(11) 5052-3907", dist: "1.2km", bairro: "Moema", endereco: "Av. Moema, 667 - Moema", foco: "Moema/Brooklin", insta: "coelhoelimaimoveis", site: "coelhoelima.com.br", creci: "--", rating: "4.4", avaliacoes: "12", descricao: "Compra, venda, locacao e adm. 718 imoveis.", motivo: "1.2km, micro, 4.4 rating." },
  { id: 5, pri: "A", ordem: 5, nome: "Taurus Imoveis", tel: "(11) 4580-4647", dist: "1.3km", bairro: "Moema", endereco: "R. Grauna, 290 - Moema", foco: "Moema", insta: "taurusimoveis", site: "taurusimoveis.com", creci: "--", rating: "--", avaliacoes: "1", descricao: "Apenas 1 avaliacao.", motivo: "1.3km. Validar se ativa." },
  { id: 6, pri: "A", ordem: 6, nome: "House Moema", tel: "(11) 98086-3000", dist: "940m", bairro: "Moema", endereco: "Al. dos Maracatins, 426 - Moema", foco: "Local Moema", insta: "housemoema", site: "housemoema.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Micro, core Moema. Tel celular = dono acessivel.", motivo: "Micro, 940m. Dono direto." },
  { id: 7, pri: "A", ordem: 7, nome: "Sergio Rabelo Imoveis", tel: "(11) 2198-5555", dist: "1.4km", bairro: "Moema", endereco: "Av. Moema, 546 - Moema", foco: "Moema", insta: "sergio_rabeloo", site: "sergiorabeloimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Core Moema. Dono no nome.", motivo: "Micro, 1.4km, dono no nome." },
  { id: 8, pri: "A", ordem: 8, nome: "HGB Imoveis", tel: "Ver site", dist: "1.8km", bairro: "Moema", endereco: "Av. Macuco, 726 - Moema", foco: "Moema", insta: "hgbimoveis", site: "hgbimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Core Moema. Pouca info online.", motivo: "Micro, 1.8km. Buscar tel no site." },
  { id: 9, pri: "A", ordem: 9, nome: "Silva Ramos Imoveis", tel: "(11) 5051-2955", dist: "850m", bairro: "Indianopolis", endereco: "Av. Moema, 265, cj. 134", foco: "Indianopolis/Moema", insta: "", site: "silva-ramos.com", creci: "--", rating: "--", avaliacoes: "--", descricao: "Horario comercial. Escritorio real.", motivo: "Micro tradicional." },
  { id: 10, pri: "A", ordem: 10, nome: "Imoveis PRO", tel: "Ver site", dist: "1.3km", bairro: "Moema", endereco: "Moema (endereco a confirmar)", foco: "Investidor?", insta: "imoveispro", site: "imoveispro.com.br", creci: "--", rating: "5.0", avaliacoes: "--", descricao: "Endereco vago. 5.0 Rating.", motivo: "5.0 rating. Validar escritorio." },
  { id: 11, pri: "A", ordem: 11, nome: "Anglo Americana Imoveis", tel: "(11) 3887-4555", dist: "1.7km", bairro: "Moema", endereco: "Av. Rep. do Libano, 1190", foco: "Moema", insta: "anglo_americana_imoveis", site: "angloamericana.com.br", creci: "--", rating: "5.0", avaliacoes: "4", descricao: "Horario estruturado. 5.0 rating.", motivo: "5.0 rating, horario profissional." },
  { id: 12, pri: "A", ordem: 12, nome: "REMAX Front", tel: "Ver site", dist: "810m", bairro: "Moema", endereco: "Av. Miruna, 561 - Moema", foco: "Franquia", insta: "remaxfront", site: "remaxfront.usesquare.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Franquia REMAX.", motivo: "810m. REMAX + Moema." },
  { id: 13, pri: "A", ordem: 13, nome: "Vila Moema Imoveis", tel: "(11) 98206-8551", dist: "~Moema", bairro: "Moema", endereco: "Moema (sem endereco)", foco: "Local", insta: "vilamoemaimoveis", site: "vilamoema.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Sem endereco. Tel celular.", motivo: "Tel celular = dono direto." },
  { id: 14, pri: "C", ordem: 14, nome: "MyBroker", tel: "Ver site", dist: "2.9km", bairro: "V.Olimpia", endereco: "Av. Dr. Cardoso de Melo, 878", foco: "Boutique", insta: "mybroker.sp", site: "mybroker.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Boutique Vila Olimpia.", motivo: "Fora do raio (2.9km)." },
  { id: 15, pri: "B", ordem: 15, nome: "Mello Imoveis", tel: "(11) 2578-4183", dist: "1.2km", bairro: "Indianopolis", endereco: "Av. Indianopolis, 3000", foco: "Misto", insta: "mello_imoveis", site: "melloimoveis3000.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Micro, adjacente.", motivo: "Micro, 1.2km. 2a rodada." },
  { id: 16, pri: "A", ordem: 16, nome: "Planal Imoveis", tel: "(11) 2276-3844", dist: "850m", bairro: "P.Paulista", endereco: "Al. dos Tupinas, 559", foco: "Misto", insta: "planal_imoveis", site: "planalimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Micro em Planalto Paulista.", motivo: "850m! Muito perto." },
  { id: 17, pri: "B", ordem: 17, nome: "Lello Imoveis Moema", tel: "(11) 5095-5900", dist: "1.5km", bairro: "Moema", endereco: "Al. dos Nhambiquaras, 1045", foco: "Rede media", insta: "lelloimoveis", site: "lelloimoveis.com.br", creci: "--", rating: "4.5", avaliacoes: "62", descricao: "Rede media (15-30 corr.).", motivo: "Rede media, boa reputacao." },
  { id: 18, pri: "B", ordem: 18, nome: "Leardi Moema Indios", tel: "", dist: "1.7km", bairro: "Moema", endereco: "Al. dos Jurupis, 455", foco: "Rede media", insta: "leardi.official", site: "moemaindios214.leardi.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Rede media/grande.", motivo: "Rede media/grande." },
  { id: 19, pri: "A", ordem: 19, nome: "Casa 192", tel: "(11) 5042-1000", dist: "1.0km", bairro: "Campo Belo", endereco: "R. Antonio Comparato, 192", foco: "Misto", insta: "casa192_imoveis", site: "casa192.com", creci: "--", rating: "--", avaliacoes: "--", descricao: "Campo Belo, dentro do raio.", motivo: "1.0km. Campo Belo adjacente." },
  { id: 20, pri: "B", ordem: 20, nome: "Moema Imoveis e Adm.", tel: "(11) 5051-4311", dist: "3.3km", bairro: "Ibirapuera", endereco: "Av. Rep. do Libano, 2254", foco: "Administracao", insta: "moemaimoveisltda", site: "moemaimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Desde 1969. Adm no nome.", motivo: "2.7km fora do raio, MAS desde 1969." },
  { id: 21, pri: "B", ordem: 21, nome: "Casas Moema", tel: "(11) 98264-4230", dist: "~Moema", bairro: "Moema", endereco: "Moema (sem endereco)", foco: "Residencial", insta: "casasmoema", site: "casasmoema.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Foco residencial.", motivo: "Foco residencial." },
  { id: 22, pri: "B", ordem: 22, nome: "Ibirapuera Imoveis", tel: "", dist: "2.5km", bairro: "Ibirapuera", endereco: "Ibirapuera (sem endereco)", foco: "Misto", insta: "", site: "ibirapueraimoveis.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Sem endereco, sem telefone.", motivo: "Sem contato." },
  { id: 23, pri: "C", ordem: 23, nome: "Moema Vitoria Imoveis", tel: "(11) 5103-0300", dist: "3.3km", bairro: "Cid.Moncoes", endereco: "Av. Pe. A.J. dos Santos, 1282", foco: "Misto", insta: "moemavitoriaimoveis", site: "moemavitoria.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Cidade Moncoes, 3.3km.", motivo: "Fora do raio (3.3km)." },
  { id: 24, pri: "A", ordem: 24, nome: "SP House Imoveis", tel: "(11) 3554-3676", dist: "1.3km", bairro: "P.Paulista", endereco: "Av. Jose M. Whitaker, 890", foco: "Misto", insta: "sphouseimoveis", site: "sphouseimoveis.com", creci: "--", rating: "--", avaliacoes: "--", descricao: "Planalto Paulista.", motivo: "1.3km. Adjacente." },
  { id: 25, pri: "C", ordem: 25, nome: "Proprie Imoveis", tel: "(11) 4545-5000", dist: "2.9km", bairro: "Brooklin", endereco: "Brooklin Paulista", foco: "Misto", insta: "proprieimoveis", site: "proprie.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Brooklin, 2.9km.", motivo: "Fora do raio, Brooklin." },
  { id: 26, pri: "X", ordem: 26, nome: "Lopes Elite", tel: "", dist: "2.2km", bairro: "Indianopolis", endereco: "Av. Ibirapuera, 2033", foco: "Rede grande", insta: "lopeselitemoema", site: "elite.lopes.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Rede Lopes.", motivo: "Diretriz Amaral: esquecer Lopes." },
  { id: 27, pri: "X", ordem: 27, nome: "Lopes Prime Moema", tel: "", dist: "1.1km", bairro: "Moema", endereco: "Av. Agami, 264 - Moema", foco: "Rede grande", insta: "lopesprime", site: "lopesprime.com.br", creci: "--", rating: "--", avaliacoes: "--", descricao: "Rede Lopes.", motivo: "Diretriz Amaral: Lopes." },
];

var DEFS = { status: "pendente", visita: "", horario: "", local: "", obs: "", investidor: "", compacto: "", corretores: "", parceria: "", contato: "", contatoCargo: "", plaud: "", plaudResumo: "", interesse: "", acesso: "", concorrente: "", visitaContato: "", visitaCargo: "", escritorio: "", corretoresPresentes: "", carteiraConfirmada: "", entendeuSDR: "", interesseReal: "", proximoPasso: "", decisao: "", resumoVisita: "" };

var STS = [
  { v: "pendente", l: "Pendente", c: "#999" },
  { v: "ligou", l: "Ligou", c: "#3B82F6" },
  { v: "pediu_email", l: "Pediu email", c: "#6366F1" },
  { v: "followup", l: "Retornar", c: "#0EA5E9" },
  { v: "agendou", l: "Agendou visita", c: "#F59E0B" },
  { v: "visitou", l: "Visitou", c: "#8B5CF6" },
  { v: "cadastrou", l: "Cadastrou", c: "#10B981" },
  { v: "descartou", l: "Sem fit", c: "#EF4444" },
];

var CF = ["dist", "motivo", "pri", "ordem", "descricao", "endereco", "nome", "tel", "bairro", "foco", "insta", "site", "creci", "rating", "avaliacoes"];

function initData() {
  return ALL_DATA.map(function(d) { return Object.assign({}, DEFS, d); });
}

export default function App() {
  var [data, setData] = useState(initData);
  var [exp, setExp] = useState(null);
  var [tab, setTab] = useState("tracker");
  var [filt, setFilt] = useState("A");
  var [ok, setOk] = useState(false);
  var [saving, setSaving] = useState(false);
  var [imp, setImp] = useState("");

  // Load from Supabase
  useEffect(function() {
    async function load() {
      try {
        var resp = await supabase.from("imobiliarias").select("*");
        if (resp.data && resp.data.length > 0) {
          var saved = resp.data.map(function(row) { return row.data; });
          var merged = ALL_DATA.map(function(def) {
            var s = saved.find(function(x) { return x.id === def.id; });
            if (!s) { return Object.assign({}, DEFS, def); }
            var result = Object.assign({}, DEFS, def, s);
            CF.forEach(function(f) { result[f] = def[f]; });
            return result;
          });
          setData(merged);
        }
      } catch (e) {
        console.log("Load error:", e);
      }
      setOk(true);
    }
    load();
  }, []);

  // Save to Supabase (debounced)
  useEffect(function() {
    if (!ok) { return; }
    setSaving(true);
    var timer = setTimeout(function() {
      async function save() {
        try {
          var promises = data.map(function(item) {
            return supabase.from("imobiliarias").upsert({ id: item.id, data: item, updated_at: new Date().toISOString() });
          });
          await Promise.all(promises);
        } catch (e) {
          console.log("Save error:", e);
        }
        setSaving(false);
      }
      save();
    }, 1500);
    return function() { clearTimeout(timer); };
  }, [data, ok]);

  function upd(id, f, v) {
    setData(function(p) {
      return p.map(function(i) {
        if (i.id === id) { return Object.assign({}, i, { [f]: v }); }
        return i;
      });
    });
  }

  var filtered = data.filter(function(d) {
    if (filt === "all") { return true; }
    return d.pri === filt;
  }).sort(function(a, b) { return a.ordem - b.ordem; });

  function cnt(s) { return data.filter(function(d) { return d.status === s; }).length; }
  var ligs = data.filter(function(d) { return d.status !== "pendente" && d.pri !== "X"; }).length;
  function priE(p) { return p === "A" ? "\uD83D\uDFE2" : p === "B" ? "\uD83D\uDFE1" : p === "C" ? "\uD83D\uDD35" : "\u274C"; }
  function gSt(s) { return STS.find(function(x) { return x.v === s; }) || STS[0]; }

  var L = { fontSize: 10, color: "#999", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 };

  function BtnGroup(props) {
    return (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {props.items.map(function(o) {
          var active = props.item[props.field] === o.v;
          return <button key={o.v} onClick={function() { upd(props.item.id, props.field, o.v); }} style={{ flex: 1, padding: "6px 3px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: active ? "2px solid " + o.c : "1px solid #e5e5e5", background: active ? o.c + "15" : "#fff", color: active ? o.c : "#999", fontWeight: active ? 600 : 400, minWidth: 55 }}>{o.l}</button>;
        })}
      </div>
    );
  }

  function Inp(props) {
    return <input value={props.item[props.field] || ""} onChange={function(e) { upd(props.item.id, props.field, e.target.value); }} placeholder={props.ph || ""} style={{ width: "100%", padding: "6px 8px", borderRadius: 5, border: "1px solid #ddd", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />;
  }

  function Txa(props) {
    return <textarea value={props.item[props.field] || ""} onChange={function(e) { upd(props.item.id, props.field, e.target.value); }} placeholder={props.ph || ""} rows={props.rows || 3} style={{ width: "100%", padding: "8px", borderRadius: 5, border: "1px solid #ddd", fontSize: 12, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.5 }} />;
  }

  var m = useMemo(function() {
    var a = data.filter(function(d) { return d.pri !== "X"; });
    var c = a.filter(function(d) { return d.status !== "pendente"; });
    var pA = a.filter(function(d) { return d.pri === "A"; });
    var pAc = pA.filter(function(d) { return d.status !== "pendente"; });
    var ag = cnt("agendou"), vi = cnt("visitou"), ca = cnt("cadastrou");
    var tv = c.length > 0 ? Math.round(((ag + vi + ca) / c.length) * 100) : 0;
    return {
      total: a.length, cont: c.length,
      pA: pA.length, pAc: pAc.length, pAp: pA.filter(function(d) { return d.status === "pendente"; }).length,
      iS: c.filter(function(d) { return d.interesse === "sim"; }).length,
      iP: c.filter(function(d) { return d.interesse === "parcial"; }).length,
      iN: c.filter(function(d) { return d.interesse === "nao"; }).length,
      aP: c.filter(function(d) { return d.acesso === "pro"; }).length,
      aO: c.filter(function(d) { return d.acesso === "ok"; }).length,
      aR: c.filter(function(d) { return d.acesso === "ruim"; }).length,
      pe: cnt("pediu_email"), fu: cnt("followup"),
      sf: Math.max(cnt("descartou") - data.filter(function(d) { return d.pri === "X"; }).length, 0),
      ag: ag, vi: vi, ca: ca, tv: tv, ligs: ligs
    };
  }, [data]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", maxWidth: 720, margin: "0 auto", padding: "12px", color: "#1a1a1a" }}>
      <div style={{ marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #1a1a1a" }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#BCBFCC" }}>use.incorporadora</div>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: "2px 0 0" }}>Controle de Imobiliarias</h1>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
          27 imobiliarias - Meta: 10 parceiras - Sprint 1
          {saving && <span style={{ marginLeft: 8, color: "#F59E0B" }}>salvando...</span>}
          {ok && !saving && <span style={{ marginLeft: 8, color: "#10B981" }}>salvo na nuvem</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 12, borderRadius: 8, overflow: "hidden", border: "1px solid #ddd" }}>
        {[["tracker", "Tracker"], ["pesquisa", "Pre-busca"], ["metricas", "Metricas"], ["script", "Script"], ["dados", "Dados"]].map(function(t) {
          return <button key={t[0]} onClick={function() { setTab(t[0]); }} style={{ flex: 1, padding: "10px 3px", fontSize: 11, fontWeight: tab === t[0] ? 700 : 400, background: tab === t[0] ? "#1a1a1a" : "#fff", color: tab === t[0] ? "#fff" : "#666", border: "none", cursor: "pointer" }}>{t[1]}</button>;
        })}
      </div>

      {/* TRACKER */}
      {tab === "tracker" && (
        <div>
          <div style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", color: "#fff", padding: "10px 16px", borderRadius: 10, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Ligacoes realizadas</span>
            <span style={{ fontSize: 26, fontWeight: 800 }}>{ligs}</span>
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto" }}>
            {[["Pend.", cnt("pendente"), "#999"], ["Email", cnt("pediu_email"), "#6366F1"], ["Ret.", cnt("followup"), "#0EA5E9"], ["Agend.", cnt("agendou"), "#F59E0B"], ["Visit.", cnt("visitou"), "#8B5CF6"], ["Cad.", cnt("cadastrou"), "#10B981"], ["S/f", cnt("descartou"), "#EF4444"]].map(function(x) {
              return <div key={x[0]} style={{ textAlign: "center", padding: "4px 5px", background: x[2] + "10", borderRadius: 6, minWidth: 38 }}><div style={{ fontSize: 16, fontWeight: 700, color: x[2] }}>{x[1]}</div><div style={{ fontSize: 7, color: x[2], textTransform: "uppercase" }}>{x[0]}</div></div>;
            })}
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
            {[["all", "Todas"], ["A", "A"], ["B", "B"], ["C", "C"], ["X", "X"]].map(function(f) {
              return <button key={f[0]} onClick={function() { setFilt(f[0]); }} style={{ padding: "4px 10px", fontSize: 11, borderRadius: 20, border: filt === f[0] ? "2px solid #1a1a1a" : "1px solid #ddd", background: filt === f[0] ? "#1a1a1a" : "#fff", color: filt === f[0] ? "#fff" : "#666", cursor: "pointer", fontWeight: filt === f[0] ? 600 : 400 }}>{f[1]}</button>;
            })}
          </div>

          {filtered.map(function(item) {
            var isE = exp === item.id;
            var s = gSt(item.status);
            var sq = ["ligou", "pediu_email", "followup", "agendou", "visitou", "cadastrou"].indexOf(item.status) >= 0;
            var sv = ["agendou", "visitou", "cadastrou"].indexOf(item.status) >= 0;
            var spv = ["visitou", "cadastrou"].indexOf(item.status) >= 0;

            return (
              <div key={item.id} style={{ border: "1px solid #e5e5e5", borderRadius: 10, marginBottom: 6, overflow: "hidden", background: item.status === "descartou" ? "#fafafa" : "#fff", opacity: item.status === "descartou" ? 0.5 : 1 }}>
                <div onClick={function() { setExp(isE ? null : item.id); }} style={{ display: "flex", alignItems: "center", padding: "10px 12px", cursor: "pointer", gap: 8 }}>
                  <span style={{ fontSize: 13 }}>{priE(item.pri)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.nome}</div>
                    <div style={{ fontSize: 10, color: "#999" }}>{item.dist} - {item.bairro}{item.contato ? " - " + item.contato : ""}{item.interesse === "sim" ? " - interessou" : ""}{item.interesse === "nao" ? " - s/ interesse" : ""}</div>
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: s.c + "15", color: s.c, textTransform: "uppercase", whiteSpace: "nowrap" }}>{s.l}</div>
                </div>

                {isE && (
                  <div style={{ padding: "0 12px 14px", borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
                    <div style={{ fontSize: 11, color: "#555", background: "#f9f9f9", padding: "6px 8px", borderRadius: 6, marginBottom: 8, lineHeight: 1.4 }}>{item.motivo}</div>

                    {item.tel && item.tel !== "Ver site" && <a href={"tel:" + item.tel.replace(/[^0-9+]/g, "")} style={{ display: "block", background: "#1a1a1a", color: "#fff", padding: "10px", borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 8 }}>Tel: {item.tel}</a>}
                    {item.tel === "Ver site" && <div style={{ background: "#FEF3C7", color: "#92400E", padding: "8px", borderRadius: 8, textAlign: "center", fontSize: 12, marginBottom: 8 }}>Buscar telefone no site</div>}

                    <div style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" }}>
                      {item.insta && <a href={"https://instagram.com/" + item.insta} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 10px", fontSize: 11, borderRadius: 6, background: "#fce4ec", color: "#C2185B", textDecoration: "none", fontWeight: 500 }}>@{item.insta}</a>}
                      {item.site && <a href={"https://" + item.site} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 10px", fontSize: 11, borderRadius: 6, background: "#e3f2fd", color: "#1565C0", textDecoration: "none", fontWeight: 500 }}>Site</a>}
                      <a href={"https://www.google.com/maps/search/" + encodeURIComponent(item.nome + " " + item.bairro + " Sao Paulo")} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 10px", fontSize: 11, borderRadius: 6, background: "#e8f5e9", color: "#2E7D32", textDecoration: "none", fontWeight: 500 }}>Maps</a>
                    </div>

                    <div style={{ fontSize: 11, color: "#555", background: "#f5f5f5", padding: 8, borderRadius: 6, marginBottom: 8, lineHeight: 1.5 }}>Rating: {item.rating} ({item.avaliacoes} av.) - CRECI: {item.creci} - {item.endereco}<br />{item.descricao}</div>

                    <div style={{ background: "#f0f9ff", padding: 10, borderRadius: 8, marginBottom: 8, border: "1px solid #bae6fd" }}><div style={L}>Contato</div><div style={{ display: "flex", gap: 6 }}><Inp field="contato" item={item} ph="Nome" /><Inp field="contatoCargo" item={item} ph="Cargo" /></div></div>

                    <div style={{ marginBottom: 8 }}><div style={L}>Status</div><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{STS.map(function(o) { return <button key={o.v} onClick={function() { upd(item.id, "status", o.v); }} style={{ padding: "5px 7px", borderRadius: 5, fontSize: 10, cursor: "pointer", border: item.status === o.v ? "2px solid " + o.c : "1px solid #e5e5e5", background: item.status === o.v ? o.c + "15" : "#fff", color: item.status === o.v ? o.c : "#888", fontWeight: item.status === o.v ? 600 : 400 }}>{o.l}</button>; })}</div></div>

                    {sq && <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 8, marginBottom: 8 }}><div style={L}>Qualificacao</div>{[["investidor", "Trabalha c/ investidor?", "S / N / Parcial"], ["compacto", "Trabalha c/ compacto?", "S / N / Parcial"], ["corretores", "No corretores", "ex: 5"], ["parceria", "Aberto a parceria?", "S / N / Talvez"], ["concorrente", "Vende concorrente?", "S (qual?) / N"]].map(function(q) { return <div key={q[0]} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}><span style={{ fontSize: 11, color: "#555", width: 150, flexShrink: 0 }}>{q[1]}</span><Inp field={q[0]} item={item} ph={q[2]} /></div>; })}</div>}

                    {sq && <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 8, marginBottom: 8 }}><div style={L}>Impressao</div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Se interessou?</div><BtnGroup items={[{ v: "sim", l: "Sim", c: "#10B981" }, { v: "parcial", l: "Parcial", c: "#F59E0B" }, { v: "nao", l: "Nao", c: "#EF4444" }, { v: "nc", l: "Nao consegui falar", c: "#999" }]} field="interesse" item={item} /></div><div><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Atendimento?</div><BtnGroup items={[{ v: "pro", l: "Profissional", c: "#10B981" }, { v: "ok", l: "Ok", c: "#F59E0B" }, { v: "ruim", l: "Ruim", c: "#EF4444" }]} field="acesso" item={item} /></div></div>}

                    {sv && <div style={{ background: "#FFFBEB", padding: 10, borderRadius: 8, marginBottom: 8, border: "1px solid #FDE68A" }}><div style={L}>Reuniao / Visita</div><div style={{ display: "flex", gap: 6, marginBottom: 6 }}><div style={{ flex: 1 }}><div style={{ fontSize: 10, color: "#999", marginBottom: 2 }}>Data</div><input type="date" value={item.visita || ""} onChange={function(e) { upd(item.id, "visita", e.target.value); }} style={{ width: "100%", padding: "6px 8px", borderRadius: 5, border: "1px solid #ddd", fontSize: 12, boxSizing: "border-box" }} /></div><div style={{ flex: 1 }}><div style={{ fontSize: 10, color: "#999", marginBottom: 2 }}>Horario</div><input type="time" value={item.horario || ""} onChange={function(e) { upd(item.id, "horario", e.target.value); }} style={{ width: "100%", padding: "6px 8px", borderRadius: 5, border: "1px solid #ddd", fontSize: 12, boxSizing: "border-box" }} /></div></div><div><div style={{ fontSize: 10, color: "#999", marginBottom: 2 }}>Local</div><Inp field="local" item={item} ph={item.endereco || "Endereco"} /></div></div>}

                    {spv && <div style={{ background: "#F5F3FF", padding: 10, borderRadius: 8, marginBottom: 8, border: "1px solid #DDD6FE" }}><div style={L}>Avaliacao pos-visita</div><div style={{ display: "flex", gap: 6, marginBottom: 6 }}><Inp field="visitaContato" item={item} ph="Reuniu com quem?" /><Inp field="visitaCargo" item={item} ph="Cargo" /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Escritorio</div><BtnGroup items={[{ v: "estruturado", l: "Estruturado", c: "#10B981" }, { v: "simples", l: "Simples", c: "#F59E0B" }, { v: "sem", l: "Sem estrutura", c: "#EF4444" }]} field="escritorio" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Corretores presentes?</div><BtnGroup items={[{ v: "sim", l: "Sim", c: "#10B981" }, { v: "dono", l: "So o dono", c: "#F59E0B" }, { v: "vazio", l: "Vazio", c: "#EF4444" }]} field="corretoresPresentes" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Carteira confirmada?</div><BtnGroup items={[{ v: "investidores", l: "Tem investidores", c: "#10B981" }, { v: "residencial", l: "Mais residencial", c: "#F59E0B" }, { v: "nc", l: "Nao ficou claro", c: "#999" }]} field="carteiraConfirmada" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Entendeu proposta SDR?</div><BtnGroup items={[{ v: "sim", l: "Sim", c: "#10B981" }, { v: "parcial", l: "Parcial", c: "#F59E0B" }, { v: "nao", l: "Nao", c: "#EF4444" }]} field="entendeuSDR" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Interesse real</div><BtnGroup items={[{ v: "avancar", l: "Quer avancar", c: "#10B981" }, { v: "talvez", l: "Talvez", c: "#F59E0B" }, { v: "educado", l: "So educado", c: "#EF4444" }]} field="interesseReal" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Proximo passo</div><BtnGroup items={[{ v: "cadastro", l: "Cadastro + treino", c: "#10B981" }, { v: "reuniao", l: "Mais reuniao", c: "#F59E0B" }, { v: "nenhum", l: "Nenhum", c: "#EF4444" }]} field="proximoPasso" item={item} /></div><div style={{ marginBottom: 6 }}><div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>Decisao</div><BtnGroup items={[{ v: "fecha", l: "Fecha parceria", c: "#10B981" }, { v: "mais", l: "Mais reuniao", c: "#F59E0B" }, { v: "descarta", l: "Descarta", c: "#EF4444" }]} field="decisao" item={item} /></div><div><div style={{ fontSize: 10, color: "#7C3AED", marginBottom: 3, textTransform: "uppercase" }}>Resumo da visita</div><Txa field="resumoVisita" item={item} ph="O que aconteceu? Impressao, pontos positivos/negativos..." rows={5} /></div></div>}

                    <div style={{ background: "#F5F3FF", padding: 10, borderRadius: 8, marginBottom: 8, border: "1px solid #DDD6FE" }}><div style={L}>Gravacao Plaud + Resumo</div><Inp field="plaud" item={item} ph="Link gravacao ou nome arquivo" />{item.plaud && item.plaud.startsWith("http") && <a href={item.plaud} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#7C3AED", textDecoration: "underline", display: "block", margin: "4px 0" }}>Abrir gravacao</a>}<div style={{ fontSize: 10, color: "#7C3AED", margin: "6px 0 3px", textTransform: "uppercase" }}>Resumo (leia antes da reuniao)</div><Txa field="plaudResumo" item={item} ph="O que foi falado? Pontos principais, tom, duvidas..." rows={6} /></div>

                    <div><div style={L}>Observacoes gerais</div><Txa field="obs" item={item} ph="Anotacoes livres..." rows={3} /></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PRE-BUSCA */}
      {tab === "pesquisa" && (
        <div>
          <div style={{ background: "#f9f9f9", padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 12, lineHeight: 1.6 }}>
            <b>Checklist:</b> Instagram (ultimos 20 posts) - Google Maps (rating, fotos) - Site (lancamentos?) - <a href="https://www.crecisp.gov.br/cidadao/consultas" target="_blank" rel="noopener noreferrer" style={{ color: "#3B82F6" }}>CRECI-SP</a>
          </div>
          {data.filter(function(d) { return d.pri === "A"; }).sort(function(a, b) { return a.ordem - b.ordem; }).map(function(item) {
            return <div key={item.id} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12, marginBottom: 8 }}><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.nome}</div><div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>{item.dist} - {item.bairro} - {item.endereco}</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>{item.insta && <a href={"https://instagram.com/" + item.insta} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", fontSize: 12, borderRadius: 6, background: "#fce4ec", color: "#C2185B", textDecoration: "none", fontWeight: 600, flex: "1 1 auto", textAlign: "center" }}>@{item.insta}</a>}{item.site && <a href={"https://" + item.site} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", fontSize: 12, borderRadius: 6, background: "#e3f2fd", color: "#1565C0", textDecoration: "none", fontWeight: 600, flex: "1 1 auto", textAlign: "center" }}>{item.site}</a>}<a href={"https://www.google.com/maps/search/" + encodeURIComponent(item.nome + " Moema Sao Paulo")} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", fontSize: 12, borderRadius: 6, background: "#e8f5e9", color: "#2E7D32", textDecoration: "none", fontWeight: 600, flex: "1 1 auto", textAlign: "center" }}>Maps</a></div><div style={{ fontSize: 11, color: "#555", background: "#f5f5f5", padding: 8, borderRadius: 6, lineHeight: 1.5 }}>Rating: {item.rating} ({item.avaliacoes} av.) - CRECI: {item.creci}<br />{item.descricao}</div></div>;
          })}
        </div>
      )}

      {/* METRICAS */}
      {tab === "metricas" && (
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Dados pra reuniao com Joao</div>
          <div style={{ marginBottom: 16 }}><div style={L}>Funil</div>{[["Mapeadas", m.total, "#1a1a1a"], ["Contatadas", m.cont, "#3B82F6"], ["Agendou", m.ag + m.vi + m.ca, "#F59E0B"], ["Visitou", m.vi + m.ca, "#8B5CF6"], ["Parceria", m.ca, "#10B981"]].map(function(x) { var p = m.total > 0 ? Math.max((x[1] / m.total) * 100, 4) : 4; return <div key={x[0]} style={{ marginBottom: 4 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}><span>{x[0]}</span><span style={{ fontWeight: 700 }}>{x[1]}</span></div><div style={{ background: "#f0f0f0", borderRadius: 4, height: 20, overflow: "hidden" }}><div style={{ background: x[2], height: "100%", borderRadius: 4, width: p + "%" }} /></div></div>; })}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}><div style={{ flex: 1, background: "#f0f9ff", padding: 12, borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#3B82F6" }}>{m.pAc}/{m.pA}</div><div style={{ fontSize: 10, color: "#3B82F6", textTransform: "uppercase" }}>Prio A contatadas</div></div><div style={{ flex: 1, background: "#ECFDF5", padding: 12, borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#10B981" }}>{m.tv}%</div><div style={{ fontSize: 10, color: "#10B981", textTransform: "uppercase" }}>Ligacao - visita</div></div></div>
          <div style={{ marginBottom: 16 }}><div style={L}>Interesse</div><div style={{ display: "flex", gap: 6 }}>{[["Sim", m.iS, "#10B981"], ["Parcial", m.iP, "#F59E0B"], ["Nao", m.iN, "#EF4444"]].map(function(x) { return <div key={x[0]} style={{ flex: 1, textAlign: "center", padding: 8, background: x[2] + "10", borderRadius: 6 }}><div style={{ fontSize: 20, fontWeight: 700, color: x[2] }}>{x[1]}</div><div style={{ fontSize: 9, color: x[2], textTransform: "uppercase" }}>{x[0]}</div></div>; })}</div></div>
          <div style={{ marginBottom: 16 }}><div style={L}>Atendimento</div><div style={{ display: "flex", gap: 6 }}>{[["Prof.", m.aP, "#10B981"], ["Ok", m.aO, "#F59E0B"], ["Ruim", m.aR, "#EF4444"]].map(function(x) { return <div key={x[0]} style={{ flex: 1, textAlign: "center", padding: 8, background: x[2] + "10", borderRadius: 6 }}><div style={{ fontSize: 20, fontWeight: 700, color: x[2] }}>{x[1]}</div><div style={{ fontSize: 9, color: x[2], textTransform: "uppercase" }}>{x[0]}</div></div>; })}</div></div>
          <div style={{ marginBottom: 16 }}><div style={L}>Nao avancaram</div><div style={{ display: "flex", gap: 6 }}>{[["Email", m.pe, "#6366F1"], ["Retornar", m.fu, "#0EA5E9"], ["Sem fit", m.sf, "#EF4444"]].map(function(x) { return <div key={x[0]} style={{ flex: 1, textAlign: "center", padding: 8, background: x[2] + "10", borderRadius: 6 }}><div style={{ fontSize: 20, fontWeight: 700, color: x[2] }}>{x[1]}</div><div style={{ fontSize: 9, color: x[2], textTransform: "uppercase" }}>{x[0]}</div></div>; })}</div></div>
          <div style={{ background: "#f9f9f9", padding: 12, borderRadius: 8, fontSize: 12, lineHeight: 1.6 }}><b>Resumo Sprint 1:</b><br />{m.ligs} ligacoes de {m.total} mapeadas. {m.pAc}/{m.pA} Prio A contatadas ({m.pAp} pendentes).<br />{m.ag} visitas agendadas, {m.vi} realizadas, {m.ca} parcerias fechadas. Taxa: {m.tv}%.</div>
        </div>
      )}

      {/* SCRIPT */}
      {tab === "script" && (
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ background: "#1a1a1a", color: "#fff", padding: 14, borderRadius: 10, marginBottom: 14 }}><div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#BCBFCC", marginBottom: 4 }}>OBJETIVO</div><div><b>Filtrar e agendar visita.</b> 3 sim = agenda - 2 = sem prioridade - 1 = agradece</div></div>
          <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999", marginBottom: 6 }}>ABERTURA</div><div style={{ background: "#f5f5f5", padding: 14, borderRadius: 8, fontSize: 13, fontStyle: "italic", borderLeft: "3px solid #1a1a1a" }}>"Oi [nome], Bruno Trolezi, responsavel comercial da Use Incorporadora. A Use nasceu de um <b>spin-off de uma grande incorporadora carioca de 30+ anos</b>, mas e uma estrutura nova em SP.<br /><br />Estamos <b>ampliando nossa base de parceiros</b>. Temos um empreendimento em Moema, <b>75% vendido</b>, e estou <b>selecionando</b> imobiliarias da regiao.<br /><br />Gostaria de <b>visitar o teu escritorio</b>, bater um papo, entender a tua estrutura."</div></div>
          <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999", marginBottom: 6 }}>PERGUNTAS (3-4 max)</div>{[["Trabalham mais com investidor ou morador?", "Perfil"], ["Faixa de ticket que mais trabalham?", "Sinergia"], ["Lancamentos ou revenda?", "Disposicao"], ["Quantos corretores?", "Porte"]].map(function(q, i) { return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}><div style={{ background: "#1a1a1a", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div><div><div style={{ fontSize: 13 }}>"{q[0]}"</div><div style={{ fontSize: 10, color: "#999" }}>{q[1]}</div></div></div>; })}</div>
          <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999", marginBottom: 6 }}>FECHAMENTO</div>{[["Tem fit", "#10B981", "#ECFDF5", "\"Posso passar ai na [dia]? Uns 20 minutos.\""], ["Duvida", "#F59E0B", "#FFFBEB", "\"Posso mandar um resumo por WhatsApp?\""], ["Sem fit", "#EF4444", "#FEF2F2", "\"Talvez pra esse produto nao. A Use tem pipeline forte.\""]].map(function(x) { return <div key={x[0]} style={{ marginBottom: 8 }}><div style={{ fontSize: 11, fontWeight: 600, color: x[1], marginBottom: 3 }}>{x[0]}</div><div style={{ background: x[2], padding: 12, borderRadius: 8, fontSize: 13, fontStyle: "italic", borderLeft: "3px solid " + x[1] }}>{x[3]}</div></div>; })}</div>
          <div style={{ background: "#FFFBEB", padding: 12, borderRadius: 8, borderLeft: "3px solid #F59E0B" }}><div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>POSTURA</div><div style={{ fontSize: 12 }}>Selecionando parceiros. Usar: "ampliando" - "selecionando" - "75% vendido" - "spin-off"<br />Nunca: "precisa vender" - "abrindo pro mercado" - Nao falar ADM, comissao no 1o contato.</div></div>
        </div>
      )}

      {/* DADOS */}
      {tab === "dados" && (
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Backup e restauracao - Dados salvos no Supabase (nuvem)</div>
          <button onClick={function() { navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(function() { alert("JSON copiado!"); }); }} style={{ width: "100%", padding: 12, background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 8 }}>Copiar dados (JSON)</button>
          <button onClick={function() { var lines = data.filter(function(d) { return d.pri !== "X"; }).map(function(d) { return d.nome + "|" + d.status + "|" + (d.interesse || "--") + "|" + (d.acesso || "--") + "|" + (d.contato || "--") + "|" + (d.obs || "--").substring(0, 50); }); navigator.clipboard.writeText("NOME|STATUS|INTERESSE|ATEND|CONTATO|OBS\n" + lines.join("\n")).then(function() { alert("Resumo copiado!"); }); }} style={{ width: "100%", padding: 12, background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}>Copiar resumo (texto)</button>
          <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginBottom: 8 }}><div style={L}>Importar dados (restaurar backup)</div><textarea value={imp} onChange={function(e) { setImp(e.target.value); }} placeholder="Cole o JSON aqui..." rows={4} style={{ width: "100%", padding: 8, borderRadius: 5, border: "1px solid #ddd", fontSize: 11, fontFamily: "monospace", boxSizing: "border-box", marginBottom: 8 }} /><button onClick={function() { try { var parsed = JSON.parse(imp); if (Array.isArray(parsed)) { setData(parsed); setImp(""); alert("Importado!"); } } catch (e) { alert("JSON invalido"); } }} style={{ width: "100%", padding: 10, background: "#F59E0B", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Importar</button></div>
          <div style={{ marginTop: 16, borderTop: "1px solid #eee", paddingTop: 12 }}><button onClick={function() { if (confirm("APAGAR TUDO?")) { setData(initData()); } }} style={{ width: "100%", padding: 10, background: "#fff", color: "#EF4444", border: "2px solid #EF4444", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Resetar tudo</button></div>
        </div>
      )}

      <div style={{ marginTop: 14, padding: "8px 0", borderTop: "1px solid #eee", textAlign: "center" }}><span style={{ fontSize: 10, color: "#BCBFCC" }}>use.inc - Tracker v5 - Supabase</span></div>
    </div>
  );
}
