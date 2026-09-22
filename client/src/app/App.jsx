import { useEffect, useState } from "react";
import axios from "axios";

const dummyURLs = [
  {
    _id: 1,
    originalUrl:
      "https://www.amazon.in/iPhone-17-256-Promotion-Resistance/dp/B0FQFYXCC4/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=O8GPL&content-id=amzn1.sym.41279fa1-dd23-4c70-9745-af6d0ebf3670%3Aamzn1.symc.30e3dbb4-8dd8-4bad-b7a1-a45bcdbc49b8&pf_rd_p=41279fa1-dd23-4c70-9745-af6d0ebf3670&pf_rd_r=63MEM89ZVS4ZFD2QW0ZK&pd_rd_wg=pFcRr&pd_rd_r=730c54fd-81e0-45da-bed1-3f7c71888f5c&pd_rd_i=B0FQFYXCC4",
    shortCode: "abc123",
    clicks: 10,
  },
  {
    _id: 2,
    originalUrl:
      "https://www.amazon.in/Apple-MacBook-Laptop-18%E2%80%91core-32%E2%80%91core/dp/B0GR1B69CB/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=IzXp5&content-id=amzn1.sym.41279fa1-dd23-4c70-9745-af6d0ebf3670%3Aamzn1.symc.30e3dbb4-8dd8-4bad-b7a1-a45bcdbc49b8&pf_rd_p=41279fa1-dd23-4c70-9745-af6d0ebf3670&pf_rd_r=JXKKX11VHAZPV8Y4AH9Z&pd_rd_wg=j3a6m&pd_rd_r=3300740e-7ef7-4122-8803-8e6363d2dce1&pd_rd_i=B0GR1B69CB&th=1",
    shortCode: "xYUI89",
    clicks: 5,
  },
  {
    _id: 3,
    originalUrl:
      "https://www.amazon.in/Not-Safe-Work-enemies-lovers/dp/9373070010/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=ie7Fw&content-id=amzn1.sym.41279fa1-dd23-4c70-9745-af6d0ebf3670%3Aamzn1.symc.30e3dbb4-8dd8-4bad-b7a1-a45bcdbc49b8&pf_rd_p=41279fa1-dd23-4c70-9745-af6d0ebf3670&pf_rd_r=QEGVYD0EE19VVWSFA8E6&pd_rd_wg=9RaoZ&pd_rd_r=2309c548-f6f6-4f39-8a59-ce9818b4d778&pd_rd_i=9373070010",
    shortCode: "zZxY12",
    clicks: 15,
  },
];

const App = () => {
  const [urls, setUrls] = useState(dummyURLs);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Copy helper with dynamic tooltip feedback
  const handleCopy = (text, identifier) => {
    navigator.clipboard.writeText(text);
    setCopiedId(identifier);
    setTimeout(() => setCopiedId(null), 2000);
  };

  async function fetchUrls() {
    try {
      const response = await axios.get("/api/url/all");
      let url = response.data.data;
      setUrls(url);
    } catch (err) {
      console.log("Using initial data or server offline", err);
    }
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  async function createShortUrl() {
    if (!inputValue.trim()) return;
    try {
      const response = await axios.post("/api/url/create", {
        url: inputValue,
      });
      setCurrentUrl({
        originalUrl: response.data.data.originalUrl,
        shortCode: response.data.data.shortCode,
      });
      setInputValue("");
      fetchUrls();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteUrl(code) {
    try {
      await axios.delete(`/api/${code}`);
      fetchUrls();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-neutral-200/40 via-neutral-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold tracking-wider">
            ✦
          </div>
          <span className="font-semibold text-lg tracking-tight">
            ShortLink.
          </span>
        </div>

        <div className="flex items-center gap-2.5 bg-white border border-neutral-200/80 shadow-sm rounded-full py-1.5 px-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-neutral-600">
            v2.4 Live
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        <div className="relative text-center mb-10">
          <div className="hidden sm:inline-flex absolute -top-4 left-6 items-center gap-1.5 bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#0369A1] text-xs font-semibold px-3 py-1 rounded-full shadow-sm -rotate-6 select-none">
            <span>⚡ instant link</span>
          </div>
          <div className="hidden sm:inline-flex absolute -top-2 right-8 items-center gap-1.5 bg-[#4ADE80]/15 border border-[#4ADE80]/30 text-[#15803D] text-xs font-semibold px-3 py-1 rounded-full shadow-sm rotate-6 select-none">
            <span>@coplin</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1] mb-4">
            A place to condense your <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              digital footprint.
            </span>
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base max-w-lg mx-auto font-normal">
            Shorten bulky destinations into clean, frictionless links. Real-time
            metrics and swift sharing built-in.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="bg-white p-2 sm:p-2.5 rounded-full border border-neutral-200/90 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08)] flex items-center gap-2 transition-all focus-within:border-neutral-400 focus-within:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)]">
            <div className="pl-4 text-neutral-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full bg-transparent text-sm sm:text-base text-neutral-800 placeholder-neutral-400 focus:outline-none px-2 py-1"
              placeholder="Paste your long link here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createShortUrl()}
            />
            <button
              onClick={createShortUrl}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full cursor-pointer transition-all active:scale-95 whitespace-nowrap shadow-sm"
            >
              Shorten URL
            </button>
          </div>
        </div>

        {currentUrl && (
          <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Recently Created
                  </div>
                  <div className="text-base font-bold text-neutral-900 font-mono">
                    {currentUrl.shortCode}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopy(`/api/${currentUrl.shortCode}`, "recent")
                }
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  copiedId === "recent"
                    ? "bg-emerald-500 text-white shadow-emerald-200"
                    : "bg-neutral-900 text-white hover:bg-black"
                }`}
              >
                {copiedId === "recent" ? (
                  <>
                    <span>✓ Copied</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-800 tracking-tight">
                Active Links
              </h2>
              <span className="text-[11px] font-medium bg-neutral-200/70 text-neutral-600 px-2 py-0.5 rounded-full">
                {urls.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {urls.map((url) => {
              const fullShortUrl = `/api/${url.shortCode}`;
              const isCopied = copiedId === url.shortCode;

              return (
                <div
                  key={url._id || url.shortCode}
                  className="group bg-white border border-neutral-200/80 hover:border-neutral-300/90 rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold font-mono text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>/{url.shortCode}</span>
                        <svg
                          className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </a>

                      <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 truncate max-w-md">
                      {url.originalUrl}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleCopy(fullShortUrl, url.shortCode)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 ${
                        isCopied
                          ? "bg-emerald-500 text-white"
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                      }`}
                    >
                      {isCopied ? "✓ Copied" : "Copy"}
                    </button>

                    <button
                      onClick={() => deleteUrl(url.shortCode)}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 bg-rose-50 hover:bg-rose-100 text-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
